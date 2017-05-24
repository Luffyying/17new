## 初识vuex ##

当在一个大型单页应用中，会出现多个组件依赖同一个状态，它可以把组件的共享状态抽取出来，看做是一个全局单例模式进行管理，这样不论在何处改变状态，相应组件都会做出相应修改。

如何使用:

每一个Vuex应用都是一个store,在store中包含组件中的共享状态state和改变状态的方法mutations

	import Vue from 'vue';
	import Vuex from 'vuex';
	Vue.use(Vuex);
	const store = new Vuex.Store({
		state:{
			count:0
		},
		mutations:{
			increment(state){
				state.count++;
			}
		}
	})
	store.commit('increment');
	console.log(store.state.count);//1

如上就是一个简单的应用了。通过store.commit方法触发mutations改变state

在组件中使用Vuex,最简单的方法就是在Vue的computed获取state
	
	computed:{
		count(){
			return store.state.count;
		}
	}

由这个直接操作全局状态的问题引出了一种机制：将状态从根组件注入到每个子组件中。

	const app= new Vue({
		el:'app',
		store,
	})

这样在子组件中就可以这样访问：

	computed:{
		count(){
			return this.$store.state.count;
		}
	}

Vuex不但提供了数据的变更，还有很多方法，方便我们在store中做集中的处理，而不必写更多无效率的代码。

（1）**getters**

	const store = new Vuex.Store({
		state:{
			count:0,
			todos:[
			{id:1,text:'sd'},
			{id:1,text:'sd'},
			{id:1,text:'sd'}
			]
		},
		mutations:{
			increment(state){
				state.count++;
			}
		},
		getters:{
			doneSome:state => {
				return state.todos.filter(todo => todo.text);
			}
		}
	})
在vue组件中这样应用:

	computed:{
	    doneSome:{
	      return this.$store.getters.doneSome
	    }
		count(){
			return this.$store.state.count;
		}
	}

(2)**Payload**提交载荷

可以向store.commit传入第二参数，mutation的payload:

	const store = new Vuex.Store({
		state:{
			count:0,
			todos:[
			{id:1,text:'sd'},
			{id:1,text:'sd'},
			{id:1,text:'sd'}
			]
		},
		mutations:{
			// increment(state,n){
			// 	state.count+=n;
			// }
			increment(state,payload){
				state.count +=payload.price;
			}
		},
		getters:{
			doneSome:state => {
				return state.todos.filter(todo => todo.text);
			}
		}
	})
	//store.commit('increment',10);
	store.commit({
		type:'increment',
		price:10
	});


(3)**mapState**

为了简化在组件中利用computed获得store的同名属性，this.$store.state.count，应用mapState简化这个过程。

	import {mapState } from 'vuex';
	computed:{
		mapState({
			count:state =>state.count
		});
		mapState([
			'count'
		]);
	}

这里有两个写法。

(4)**mapGetters辅助函数**
	
将store中的getters映射到局部计算属性。

(5)**mapMutations**

mutations的映射函数mapMutatons,将组件中的methods映射为store.commit调用

	import { mapMutations} from 'vuex'
	methods:{
		...mapMutations([
			'increment'//映射this.increment()为this.$store.commit('increment')
		]),
		...mapMutations({
			add:'increment'//映射this.add()为this.$store.commit('increment')
		}),
	}


**Mutations必须是同步函数。**


(6)Action类似于mutation.不同的是Action可以包含异步操作,且，它提交的是mutation,而不是直接变更状态。

	const store = new Vuex.Store({
		state:{
			count:0
		},
		mutations:{
			increment(state){state.count++};
		},
		actions:{
			increment(context){context.commit('increment')}
		}

	})

	store.dispatch('increment');//action通过store.dispatch方法触发