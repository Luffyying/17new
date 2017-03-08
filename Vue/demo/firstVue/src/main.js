// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
// Object.defineProperties(Vue.prototype,{
// 	$store:{get:() =>store}
// })
//引入路由及组件
import App from './App'
import VueRouter from "vue-router"
import Clocklist from './components/Clocklist'
import Home from './components/Home'

Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(VueRouter);
//定义路由
const router = new VueRouter({
	mode:'history',
	base:__dirname,
	routes:[
		{
			path:'/',
			component:Home
		},
		{
			path:'/home',
			component:Home
		},
		{
			path:'/clocklist',
			component:Clocklist
		}]
	});
new Vue({
  el: '#app',
  //store:this.$store,
  store:store,
  router:router,
  template: '<App/>',
  components: { App }
})

