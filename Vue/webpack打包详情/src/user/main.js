import Vue from 'vue'
//import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import User from './user/index.vue'//用户中心
//Vue.config.productionTip = false
//const router1 = new VueRouter({
//		mode: 'history',
//		routes: [
//		{
//			path: '/user',
//			name: 'User',
//			component: User
//		}
//		]
//})

new Vue({
  el: '#app',
//router:router1,
  template: '<User/>',
  components: { User }
})
