### about vue store ###

	export default {
		state: {
			taskId:'',//内容项配置id,
			searchName:''//搜索关键字
		},
		mutations: {
			setTaskId(state,value){
				state.taskId = value;
			},
			setSearchName(state,value){
				state.searchName = value;
			}
			
		},
		actions:{
			reset(context){
				console.log(context)
				//context是store的一个实例
				context.commit('setTaskId',9);
			},
			/*如下更加简洁一点*/
			reset({commit}){
				//对象的解构赋值
				commit('setTaskId',9);
				//在此处可以对多个状态进行初始化赋值
			}
		}
	};
	//调用的时候就可以这样：this.$store.dispatch('reset');
	
其实，如果我们定义的state过多，dispatch action还是比较麻烦的,如果我们定义的事件的名称和actions里面的名称相同，则可以用辅助函数：mapActions

	import {mapActions} from "vuex";
	methods: {
        	...mapActions(['myTest']),
        	initData(){}
		}
	actions:{
		myTest({commit}){
			commit('setTaskId',66)
		}
	}
还有一个辅助函数：mapState
当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性
		
		import { mapState } from 'vuex'
		computed: mapState({
			    g: state => state.g,
			}),

		
 	
