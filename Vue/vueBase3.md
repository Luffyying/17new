需要记住的一点是在vue的methods里面不能使用es6中对于函数的定义

	methods:{
		data:() =>{console.log(this)}
	}

两个this有冲突