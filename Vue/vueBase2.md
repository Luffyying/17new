在vue项目中，一般将App.vue作为一个入口组件，我理解为组件的祖先，main.js视为程序的入口文件，其中有这样的代码段：

	new Vue({
	  el: '#appy',
	  router:router,
	  render: h => h(App)
	})
h => h(App)中App强调了我们的祖先组件时App.vue,那么h是什么？
将这个ES6写法还原:

	render: (function (h){
  		return h(App);
  	})

然后再还原为原来的模样：

	render:function(createElement){
	  	return createElement(app)//子组件中的阵列
	  }

暂时先不用考虑具体的内容，起码知道了用h简化了createElement函数。

