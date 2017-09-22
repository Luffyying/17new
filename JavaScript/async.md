异步编程的另一种实现方法：


	async function myFunction() {
	  try {
	    await somethingThatReturnsAPromise();
	  } catch (err) {
	    console.log(err);
	  }
	}

somethingThatReturnsAPromise()顾名思义，返回的是一个promise对象，这里可以是异步操作，也可以是任何你想操作的代码。

	function asyncGet(x){
			return new Promise(resolve => setTimeout(() =>{
				console.log('a');
				resolve(x);
			},500))
		}
		async function test(){
			let a = await asyncGet(1);
			let b = await asyncGet(2);
		}
		async function test2(){
			let a = await asyncGet(3);
			let b = await asyncGet(4);
		}
		test();
		test2();

但是要注意的是：多个async函数不是同步执行的，但是里面的await是顺序执行的，如果涉及到函数间的依赖关系，要慎重行事。
