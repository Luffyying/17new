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