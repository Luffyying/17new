<template>
	<li class="list-item">
		<div class="train-number">
			<div class="fl">{{item.train_number}} | 其他</div>
			<div class="fl">{{item.use_time | time}}</div>
		</div>
		<div class="train-detail">
			<div class="departure">
				<span class="departure-time">{{item.from_time}}</span>
				<span class="departure-attr"><i class="icon-circle s-icon1"></i>{{item.from_station}}</span>
			</div>
			<div class="arrival">
				<span class="arrival-time">{{item.to_time}}</span>
				<span class="arrival-attr"><i class="icon-circle s-icon2"></i>{{item.to_station}}</span>
        		<span class="fr">{{item.ticket_number}}张</span>
			</div>
			<div class="train-info">
				<span v-for="seat of item.seats">{{seat.name}}({{seat.number}})</span>
			</div>
		</div>
	</li>
</template>
<script>
	export default{
		props:['item']
	}
</script>
<style>
	.list-item {
	  border: 1px solid #e5e5e5;
	  margin: 8px 0;
	  background-color: #fff;
	  height: 110px;
	}
</style>