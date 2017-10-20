js引擎是单线程的，可以把每一个函数当做是不可分割的代码片段，开始执行了，就要执行完，才能去执行其他的代码段。但是实际情况下，并不总是这样，如提交表单等待的过程中，我们还可以移动滚动条，这种情况自然不是这两个函数同时在进行，Js引擎是这样做到的：每一个任务（函数）可以拆分为多个原子动作，多个函数之间的原子动作可以穿插着来执行，造成了并行的幻觉（并行只在多线程模式下才存在），这是并发（事件轮询是一个简单的并发模型）。故，像发送请求这样的异步操作就混入其中。
借鉴一句话：Promise的经典在于将JavaScript异步编程抹平为同步编程。
## Promise 之前的时光 ##



设想一个应用场景：

发送异步请求来获取用户ID，再通过ID再次发请求获得用户名称，依照你最开始写js的时候，可能会这样写：

		function getUserId(){
			$.ajax({
				url:'',
				data:{},
				success:function(returnData){
					console.log('得到了ID');
					getUserName();
					
				}
			});
		}
		function getUserName(){
			$.ajax({
				url:'',
				data:{},
				success:function(returnData){
					console.log('得到了Name');
				}
			});
		}

如果还有更多请求，层次会越嵌越深，可能这样不够优雅，不利于维护，但是好理解。后来引入了原生Promise。

## Promise 的诞生 ##

接着上一篇promise deeply4,最初的promise是这样的：

version1.0~
		
	function myPromise(fn){
		var value = null,
		deferreds = [];
		this.then = function(onFulfilled){
			deferreds.push(onFulfilled);
			return this;
		}
		function resolve(value){
			setTimeout(function(){
				deferreds.forEach(function(deferred){
					deferred(value);
				});
			},0)
		}
		fn(resolve);
		}
		var a = new myPromise(function(resolve){
			setTimeout(function(){
				resolve(8);
			},100)
		}).then(function(res){
			console.log(res);
		}).then(function(res){
			console.log(res);
		});

思考：这样是存在问题的，当resolve()执行完毕，再次调用then()已经失效了，就是这样：

	setTimeout(function(){
		a.then(function(res){
			console.log("won't here");
		})
		},100)
由此引入promise的三大状态：pending、fulfilled、rejected

version1.1~

	function P(fn){
		var value = null,
		deferreds = [];
		var state = 'pending';
		this.then = function(onFulfilled){
			if(state ==='pending'){
				deferreds.push(onFulfilled);
				return this;
			}
			onFulfilled(value);
			return this;
		}
		function resolve(newValue){
			value = newValue;
			state = 'fulfilled';
			setTimeout(function(){
				deferreds.forEach(function(deferred){
					deferred(value);
				})
			},100)
		}
		fn(resolve);
		}
		var a = new P(function(resolve){
			setTimeout(function(){
				resolve(8);
			},100)
		}).then(function(res){
			console.log(res);
		}).then(function(res){
			console.log(res);
		});
		setTimeout(function(){
			a.then(function(res){
				console.log('you can see here now!');
			})
		},100)

思考：promise最初的状态是pending，resolve之后的状态改为fulfilled.
回调函数都是一个普通的函数，如果里面包含promise又是怎么样的，而且这些回调的结果都是用了第一个resolve(value)传入的值，并非层级依赖。

串行promise的使用场景我们使用开篇提到过得，即代码段：

	getUserId()
	    .then(getUserName)
	    .then(function () {
	        // do sth else
	    });
	function getUserName(){
		return new Promise(function(resolve){
			setTimeout(function(){
				console.log('get name');
				//resolve(0);	
				},0);
			})
	}


version1.2~
改造then,resolve后

	function myPromise(fn){
			var state = 'pending';
			var value = null,
			deferreds = [];
			this.then = function(onFulfilled){
				return new myPromise(function(resolve){
					//立即执行了handle函数
					handle({
						onFulfilled:onFulfilled || null,
						resolve:resolve
					})
				})
			}
			function handle(deferred){
				if(state =='pending'){
					deferreds.push(deferred);
					return;
				}
				var ret = deferred.onFulfilled(value);
				deferred.resolve(ret);
			}
			//promise不能是同步代码，因为如果是同步的则，resolve会先于then执行，故
			//需要是异步的，可以通过setTimeout来解决
			function resolve(newValue){
				console.log(newValue);
				//判断newValue的类型，如果是由resolve(8)这种类型传递的，则非串行的promise.
				if(newValue && (typeof newValue ==='object' || typeof newValue ==='function')){
					var then = newValue.then;
					console.log(then);
					if(typeof then ==='function'){
						//then();
						then.call(newValue,resolve)
						return;
					}
				}
				state = 'fulfilled';
				value = newValue;
				setTimeout(function(){
					deferreds.forEach(function(deferred){
						handle(deferred)
					});
				},0);
				
			}
			fn(resolve);
			count++;
		}

then中返回了一个promise
如下分为两种情况讨论：

**（1）如果then的回调函数中是普通的函数，而不是返回promise，调用return生成返回值**
	
	getUserId().then(function(res){
		 	console.log('here'+res);
		 	return 9;
		}).then(function(res){
			console.log(res);
		})


**（2）如果then的回调函数中返回值是promise**

	getUserId().then(getName).then(function(rr){
			console.log(rr);
		})
	function getName(id){
			return new myPromise(function(resolve){
				setTimeout(function(){
					console.log('get name');
					resolve(0);
					
				},0);
			})
		}

### 注意这里，遇到了一个闭包的问题,理解的时候要注意###


*getUserId()*遇到异步函数后，执行后面的同步*then*,调用类中*this.then()*函数，因为返回了一个*myPromise*,故进入新的promise里面，执行最后的*fn(resolve)*,但是它和旧的*promise*的*handle*是一个执行环境，也就是执行的是旧*promise*里面的*handle*,*deferreds*也是旧的的*promise*下的变量（*getUserId()*生成的*promise*）
## Promise 之后的世界 ##

version1.3~
加上reject和错误处理的promise



