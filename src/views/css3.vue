<template>
	<div class="css">
		<h2>border属性</h2>
		<div class="boxborder">
			<p>round</p>
		</div>
		<img src="../static/img/border.png" alt="">
		
		<h2>2D转换</h2>
		<div class="transform"></div>
		<div class="otherbox"></div>
	</div>
</template>

<script>
	export default {
		name: "css3"
	}
</script>

<style scoped lang="scss">
.boxborder{
	width: 100px;
	height: 100px;
	margin-bottom: 100px;
	border:50px solid #ff5669;
	border-image-source: url("../static/img/border.png");
	border-image-slice: 33.3%;
	border-image-repeat: round;
	border-image-outset: 0 -1 0 0;
	border-image-width: auto auto;
}
h2{
	text-align: center;
}
.transform{
	width : 100px;
	height: 100px;
	background-color: #ff5669;
	/*transform:translate(10px , 0);*/
	/*transform: rotate(30deg);*/
	/*transform-origin: 0 0;*/
	/*transform :scale(1.2);*/
	/*transform:skewX(30deg);*/
	&:hover{
		transform: scale(0.8);
	 }
}
.otherbox{
	width: 100px;
	height: 100px;
	background-color: deepskyblue;
}
</style>