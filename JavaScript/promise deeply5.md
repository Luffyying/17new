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
未完....

## Promise 之后的世界 ##

