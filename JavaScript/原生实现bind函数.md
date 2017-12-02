**bind函数，从头梳理一下，从会用到知道为什么。**
## 小引 ##
### bind怎么用？   直接调用的情况 ###

		log = console.log
		var name = 'epoch'
		var obj = {
			name:'luffy',
			getName:function(){
				console.log('this:'+this)
				return this.name
			}
		}
		log(obj.getName())
		log(obj.getName.bind(window)())
		log(obj.getName.bind()())
	
		conosle result:
		this:[object Object]
		luffy
		this:[object Window]
		epoch
		this:[object Window]
		epoch

# 上 #
### bind怎么实现的 初级 ###

		function isFunc(target){
			return typeof target =='function' 
		}
		//对老版本浏览器兼容处理
		Function.prototype.bind = Function.prototype.bind || function(context){
			//this(被绑定对象)一定要是一个函数
			if(!isFunc(this)) {
				throw new TypeError('what is trying to be bound need a function ')
			}
			var target = this;
			//argu:绑定的时候带过来的参数
			var argu = Array.prototype.slice.call(arguments,1)
			//返回值是一个函数，且不是立即执行的
			return function(){
				var argu_default =  Array.prototype.slice.call(arguments)
				//这里通过参数的顺序区别优先级
				//return real_fun.apply(context,argu_default.concat(argu))
				return target.apply(context,argu.concat(argu_default))
			}

		}



## 中 ##
### bind 怎么用？通过new构造  ###

		function Point(x,y){
			this.x = x;
			this.y = y;
		}
		Point.prototype.area = function(){
			console.log(this.x * this.y)
		}
		obj = {};
		//the bind here is not ours
		var t = Point.bind(obj)
		var p = new t(5,8)
		log(obj)
		log(p.area())


		console result:
		{}
		40

这种方式是将被绑定函数看做是原函数，构造新的函数的过程。

### 如何实现?  ###

用我们上面自己写的bind来实现下面的栗子，会暴露很多问题。

(1)改变了obj

 (2)没有继承原型上的方法

		obj = {
            k:9
        }
        var bindPoint = Point.bind(obj)
        p = new bindPoint(2,3)
        console.log(obj)
        console.log(p.area())

		console result:
		{k: 9, x: 2, y: 3}
		Uncaught TypeError: p.area is not a function

改造后：


		Function.prototype.bi = Function.prototype.bi || function(context){
			if(!isFunc(this)) {
				throw new TypeError('what is trying to be bound need a function ')
			}
			var target = this;
			var argu = Array.prototype.slice.call(arguments,1)
			var F = function(){}
			if(this.prototype){
				F.prototype = this.prototype;
			}
			var bound = function(){
				var argu_default =  Array.prototype.slice.call(arguments)
				target.apply(this instanceof F?this:context || this,argu.concat(argu_default))
			}
			bound.prototype = new F();
			F.prototype = null;
			return bound;

		}

设置了中间变量F，实现判断是否是new的场景，如果直接采用这种方法：*bound.prototype = this.prototype*,当构造好的函数原型上发生改变同时会影响到原函数，不建议。

## 下 ##
### 函数长度的调整 & 叹为观止的源码 ###
ES5-shim是为了最大限度的进行兼容，包括对返回函数length属性的还原,如果按照之前的写法，返回的length属性始终是0。改造后：

	Function.prototype.bi = Function.prototype.bi || function(context){
			//this(被绑定对象)一定要是一个函数
			if(!isFunc(this)) {
				throw new TypeError('what is trying to be bound need a function ')
			}
			var target = this;
			//argu:绑定的时候带过来的参数
			var argu = Array.prototype.slice.call(arguments,1)
			//返回值是一个函数，且不是立即执行的
			var F = function(){}
			F.prototype = this.prototype;
			var boundF = function(){
				var argu_default =  Array.prototype.slice.call(arguments)
				target.apply(this instanceof F?this:context || this,argu.concat(argu_default))
			}
			var boundLength = Math.max(0,target.length - argu.length)
			var boundArgs = [];
			for (var i = 0; i < boundLength; i++) {
		        boundArgs.push('$' + i);
		    }
			/*
				return function ($1,$2) {
					boundF.apply(this)	
				}
		    */
		    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this); }')(boundF);
			bound.prototype = new F();
			return bound;

		}


	


		
