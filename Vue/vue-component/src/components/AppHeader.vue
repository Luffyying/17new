<template>
	<div class="header">
		<span>{{title}}</span>
	</div>
</template>
<script>
	export default{
		props:['title']
	}
</script>
<style>
	.header{
		text-align: center;
		width:100%;
		height: 50px;
		line-height: 50px;
		background-color: #C1FFC1;
		position: fixed;
		z-index: 1;
	}
</style>






