import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import VueResource from 'vue-resource'

Vue.use(VueRouter);
Vue.use(VueResource);//应用于动态申请数据
const First = {template:'<h1>我是第一个子页面</h1>'};
import secondComponent from './components/secondComponent.vue';
//创建一个路由器实例，且配置路由规则
const router = new VueRouter({
	mode:'history',
	base:__dirname,
	routes:[
		{
			path:'/first',
			component:First
		},
		{
			path:'/second',
			component:secondComponent
		}
	]
});
new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
})
