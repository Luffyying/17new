<template>
	<div class="clock_sidebar_inner">
		<div class="clock_sidebar_item">
			<span class="clock_sidebar_title">状态</span>
			<span class="clock_sidebar_desc" :class="{'green':status =='已计时','red':status =='已结束'}">{{status}}</span>
		</div>
		<div class="clock_sidebar_item">
			<span class="clock_sidebar_title">时长</span>
			<span class="clock_sidebar_desc">{{duration}}</span>
		</div>
	</div>
</template>
<script>
	export default{
		computed:{
			status() {
				return this.$store.getters.getStatus
			},
			duration() {
				return this.$store.getters.getDuration
			}
		}
	}
</script>
<style></style>