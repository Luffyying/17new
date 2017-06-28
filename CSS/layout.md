	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>布局</title>
		<link rel="stylesheet" href="">
		<style>
			#div1{
				height: 300px;
				border:1px solid red;
			}
			#div2{
				height: 300px;
				border:1px solid blue;
			}
			#div3{
				height: 300px;
				border:1px solid yellow;
			}
			#div4{
				height: 300px;
				border:1px solid pink;
			}
			.l1{
				height: 200px;
				background: #ccc;
			}
			.r1{
				height: 200px;
				width:500px;
				background: pink;
				float: right;
	
			}
			.l2{
				height: 200px;
				width: 300px;
				background: pink;
				float: left;
			}
			.r2{
				height: 200px;
				background: blue;
			}
			.l3{
				height: 200px;
				width: 200px;
				background: pink;
				float: left;
			}
			.r3{
				height: 200px;
				width:200px;
				background: blue;
				float: right;
			}
			.m3{
				height: 200px;
				background: green;
			}
			.l4{
				height: 200px;
				background: pink;
				float: left;
				margin-right: 500px;
			}
			.r4{
				height: 200px;
				background: blue;
				/*float: right;*/
			}
			.m4{
				height: 200px;
				width: 500px;
				background: green;
			}
			.grid{
				display: -webkit-flex;
				display: -moz-flex;
				display: -o-flex;
				display: -ms-flex;
				display: flex;
				height: 300px;
				border:1px solid pink;
			}
			.col{
				padding: 30px;
			}
			.fluid{
				flex:1;
				height: 200px;
				background: blue;
			}
			.fixed{
				width: 400px;
				height: 200px;
				background: pink;
			}
			.m5{
				margin: 0 220px;
				height: 200px;
				background: red;
			}
			.l5{
				left: 0;
				background: yellow;
			}
			.r5{
				right: 0;
				background: #ccc;
			}
			.l5,.r5{
				position: absolute;
				width: 220px;
				height: 200px;
			}
		</style>
	</head>
	<body>
		<div id="div1">
		<!-- 右侧固定，左侧自适应 -->
			<div class="r1"></div>
			<div class="l1"></div>
		</div>
		<div id="div2">
		<!-- 左侧固定，右侧自适应 -->
			<div class="l2"></div>
			<div class="r2"></div>
		</div>
		<div id="div3">
		<!-- 两端固定，中间自适应  浮动-->
			<div class="l3"></div>
			<div class="r3"></div>
			<div class="m3"></div>
		</div>
		<div id="div3">
		<!-- 两端固定，中间自适应  绝对定位-->
			<div class="l5"></div>
			<div class="r5"></div>
			<div class="m5"></div>
		</div>
		<div class="grid">
		<!-- 两端自适应，中间固定 css3 Flexbox-->
			<div class="col fluid"></div>
			<div class="col fixed"></div>
			
			<div class="col fluid"></div>
			
		</div>
		<!-- 空间释放，并不代表这个div不见了 -->
	</body>
	</html>