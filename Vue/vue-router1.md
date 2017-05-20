## About vue-router2.0 ##

使用vue构建单页应用的时候，路由是一大主角，作为入门，先了解。

	<router-link to="/goods">商品</router-link>
这就是我们的路由了，每一个router-link指向一个路由组件，对于路由组件，有两种方法：

（1）直接定义

	const temp = {template:"<p>haha</p>"}

（2）import 引入

	import goods from 'components/goods/goods';

router-link会被默认渲染为a标签，to指向链接地址，replace属性如果设置为true,导航不会留下history记录，无法回退，tag属性则是用来设置router-link被渲染成什么标签的，默认当然是a标签，tag='li'

router-view就被渲染为相应的组件了。

	<transition>
	  <keep-alive>
	    <router-view></router-view>
	  </keep-alive>
	</transition>

keep-alive可以缓存数据，这样不至于重新渲染的时候，之前的数据被清除，当做一个类似购物车的组件时，不可避免应用它了。

还有一些常见需求：如何刚进入页面就渲染某个路由组件

（1）重定向

		{
			path:'/',
			redirect:'/time-entries'
		}

（2）router.push('/time-entries');

不同路由不同标题

		// 定义路由的时候如下定义，name也可为中文
		const routes = [
		  { path: '/goods', component: goods, name: 'goods' },
		  { path: '/ratings', component: ratings, name: 'ratings' },
		  { path: '/seller', component: seller, name: 'seller' }
		];
		// 创建路由实例
		const router = new VueRouter({
		  routes: routes
		})
		// 关键在这里，设置afterEach钩子函数
		router.afterEach((to, from, next) => {
		  document.title = to.name;
		})

最后一个不常见需求：过渡组件

	<div>
      <button @click="show=!show">change</button>
      <transition name="fade">
        <p v-show="show">hello</p>
      </transition>
      <transition v-on:before-enter="beforeEnter">
        <p>lalala</p>
      </transition>
    </div>
	<style>
		.fade-enter-active, .fade-leave-active{
		  transition: all 0.5s ease     
		}
		.fade-enter, .fade-leave-active{
		  opacity: 0;color:pink
		}
	</style>
	methods:{
		beforeEnter:function(){

    	}
	}

这里通过两种方法实现组件的过渡效果，一是css类名，二是钩子函数，但是后者要操作dom元素。