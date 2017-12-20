### about props ###

父子组件传值会经常用到，但是props也会有默认值，栗子如下：
在父组件中app.vue中：

	<alert 
			:show="showAlert"
			@close="colseAlert"
			:content="alertContent"
	></alert>

这是一个弹框组件，其中show ,content是我们传过去的既定值。
在子组件alert.vue中：

	props: {
		time: {
			type: Number,
			default: 0
		},
		show: {
			type: Boolean,
			default: false
		},
		content: {
			type: String,
			default: '出错了，请稍后重试！'
		},
		showBtn: {
			type: Boolean,
			default: true
		}
	},

showBtn,time都不是我们传递过去的，也就是他们是默认值，可以正常使用，但是如何在子组件内区分是否是通过父组件传过来的？

	props:['time','show','content','showBtn']

上面这种数组形式的props没有默认值，都应该是来源于父组件，下面的这种对象的形式比较自由，加上required属性用于严格要求是否是父组件传递的值。（true的情况：time必须是从父组件传递过来的，否则报错）

	props:{
		time:{
			type: Number,
			default: 0,
			required:true,
	}}

如果既是父组件传递的又存在默认值，则默认值被覆盖。

