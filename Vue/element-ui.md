当使用ElementUI引入message、notification组件时遇到的两个小问题,

(1)会在进入页面时自动弹出，

    import {
		MessageBox,
		Notification,
	}from 'element-ui'
	Vue.use(MessageBox);
	Vue.use(Notification);

将Vue.use()改为Vue.component(MessageBox.name,MessageBox)来调用所应用的模块

(2)按需引入的时候，还是要添加Vue实例方法，通过把它们添加到Vue.prototype上实现，如：

	this.$alert('here',row.time,{
  			confirmButtonText: '确定',
  			callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
  		})		

你会发现这段代码根本不好用，提示this.$alert is not a function。在main.js中手动添加一下方法就好了

	Vue.prototype.$alert = MessageBox.alert;