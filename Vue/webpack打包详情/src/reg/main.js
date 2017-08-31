import Vue from 'vue'
//import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Reg from './reg/index.vue'//登录内容
//Vue.config.productionTip = false


//const router1 = new VueRouter({
//		mode: 'history',
//		routes: [
//		{
//			path: '/reg',
//			name: 'Reg',
//			component: Reg
//		},
//		]
//		
//})

new Vue({
  el: '#app',
//router:router1,
  template: '<Reg/>',
  components: { Reg }
})
