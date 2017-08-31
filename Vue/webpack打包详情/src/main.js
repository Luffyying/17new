import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import User from './user/index.vue'//用户中心
import Reg from './reg/index.vue'//登录内容

const router1 = new VueRouter({
		mode: 'history',
		routes: [
		{
			path: '/',
			name: 'User',
			component: User
		},
		{
			path: '/user',
			name: 'User',
			component: User
		},
		{
			path: '/reg',
			name: 'Reg',
			component: Reg
		},
		]
		
})

new Vue({
  el: '#app',
  router:router1,
  render: h => h(App),
    
})
