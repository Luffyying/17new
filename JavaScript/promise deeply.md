	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>深入理解promise</title>
		<link rel="stylesheet" href="">
	</head>
	<body>
	<button id='log' onClick="testPromise()">test</button>
	<script>
		'use strict'
		//promise的出现是为了解决回调的问题的，将嵌套的异步回调的形式改成了同步的样子,它的使用有两步
		// var promise = new Promise(function(resolve,reject){
		// 	if(value){
		// 		resolve(value);
		// 	}else{
		// 		reject(value);
		// 	}
		// });
		/*promise对象表示一个异步操作的最终完成（或失败）情况*/
		new Promise(
			/*executor*/
			function(resolve,reject){
				//这里一般进行一些异步操作,一旦完成，可以调用resolve函数来将promise状态改成完成，或者在发生错误的时候改为rejected,then方法绑定处理方法handlers,因为promise的状态的不同，then的参数因而不同，调用也不同，因为返回promise对象，所以可以被链式调用.


			}
		);
		//example1
		var myFirstPromise = new Promise(function(resolve,reject){
			setTimeout(function(){resolve('success!')},200);
		})
		myFirstPromise.then(function(msg){
			//msg的值是上面调用resolve()方法传入的值
			//msg参数类型不定
			console.log(msg);
		});
		//example2
		var promiseCount = 0;
		function testPromise(){
			var thisPromiseCount = ++promiseCount;
			var log = document.getElementById('log');
			//新建一个Promise
			var p1 = new Promise(
				function(resolve,reject){
					log.insertAdjacentHTML('beforeend', thisPromiseCount +') Promise started (<small>Async code started</small>)<br/>');
					//模拟异步代码
					window.setTimeout(
						function(){
							//填充promise
							resolve(thisPromiseCount);
						},Math.random() * 2000 + 1000);
			});
			p1.then(
				//记录被填充的值
				function(val){
					log.insertAdjacentHTML('beforeend', val +
                ') Promise fulfilled (<small>Async code terminated</small>)<br/>');
				}
			).catch(
				//记录被拒绝的理由（异常信息）
				function(reason){
					console.log('Handle rejected promise ('+reason+') here.');
				}
			)

			log.insertAdjacentHTML('beforeend', thisPromiseCount +
        	') Promise made (<small>Sync code terminated</small>)<br/>');
		}



		// function timer(fn,time){
		// 	return function(){
		// 		return new Promise((resolve,reject) =>{
		// 			setTimeout(function(){
		// 				fn();
		// 			},time)
		// 		})
		// 	}
		// }
		// Promise.resolve().then(timer(function(){console.log('1')},1000)).then(()=>{
		// 	console.log('22');
		// })
	</script>
	</body>
	</html>