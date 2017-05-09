<template>
	<ul class="sort-bar">
		<li class="sort-item" @click="sortBy('from_time')">
			start-time

		</li>
		<li class="sort-item" @click="sortBy('use_time')">
			spand
			
		</li>
		<li class="sort-item" @click="sortBy('min_price')">
			price
			
		</li>
	</ul>
</template>
<script>
	export default{
		data (){
			return {
				sort_key:'from_time',
				sort_order:1
			}
		},
		methods:{
			sortBy(sort_key){
			    if (this.sort_key === sort_key) {
		        this.sort_order = -this.sort_order; // 倒序
		      } else {
		        this.sort_order = 1;
		      }
		      this.sort_key = sort_key;
		      //这是一个父组件的回调，只要保证回调函数的名称相同即可 (sortBy  @sortBy)
			  this.$dispatch('sortBy',this.sort_key,this.sort_order);

					}
				}
	}
</script>
<style>
	.sort-bar{
		/*弹性盒模型*/
		display:-webkit-flex;
		width: 100%;
		height: 36px;
		line-height: 36px;
		background-color: #fff;
		text-align: center;
		position: fixed;
		top:50px;
		left: 0;
		border-bottom: 1px solid #EAEAEA;

	}
	.sort-item{
		flex:1;
		cursor:pointer;
	}
</style>