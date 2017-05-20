/*我们使用webpack为我们的模块打包，预处理，热加载，在.vue格式的文件中，浏览器是不认识其中的html ,style的，使用
webpack去解析.vue文件*/
/*应用入口文件，可以在这里干什么：
配置路由vue-router
引入路由子组件
引入状态管理store(注入所有子组件) vuex:状态管理库 用于管理组件的公共状态，一般大型项目会用到
应用于动态申请数据
实例化Vue
引入公共样式等
*/
/*关于import的事*/
/*各种Loader的作用就是将各种形式的资源都作为资源视为模块，css,sass,json等*/
import Vue from 'vue'
//引入路由及相应组件
import App from './App.vue'
import VueRouter from "vue-router"
import VueResource from 'vue-resource'
import services from './component/services.vue'
import serviceAdd from './component/serviceAdd.vue'
import logs from './component/logs.vue'
import login from './component/login.vue'
import store from '../vuex/store'//引入vuex的store
Vue.use(VueRouter);//注册vue-router
Vue.use(VueResource);//应用于动态申请数据

//创建一个路由器实例，且配置路由规则
const router = new VueRouter({
	mode:'history',
	base:__dirname,
	routes:[
		// {
		// 	//这是一个利用重定向实现刚进入应用就渲染某个路由组件的
		// 	path:'/',
		// 	redirect:'/time-entries'
		// },
		{
			path:'/app',
			component:App,
			name:'App',
			//设置子路由
			children:[{
				path:'services',
				component:services,
				name:'services'
			},
			{
				path:'add/services',
				component:serviceAdd,
				name:'serviceAdd'
			},
			/*:id可匹配任意值，且可在组件中获取该值*/
			{
				path:'edit/service/:id',
				component:serviceAdd,
				name:'serviceEdit'
			},
			{
	            // 日志列表
	            path: 'logs',
	            component: logs,
	            name: 'logs'
	        },
	        {
	            // 其余路由重定向至服务列表
	            path: '*',
	            redirect: { name: 'services' }
	        }]
		},
		{
			path:'*',
			redirect: { name: 'services' }
		}

	]
});
new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
})
