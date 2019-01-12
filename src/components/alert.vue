<template>
	<div class="diago" v-if="show">
		<div class="box">
			<div class="item animated bounceInDown">
				<p>11111111111111</p>
				<button class="layui-btn layui-btn-primary" @click="show = !show">消化</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "alert",
		data(){
			return{
				show : true
			}
		}
	}
</script>

<style scoped lang="scss">
	.diago{
		position: fixed;
		top: 0;
		left: 0;
		width : 100%;
		height:100%;
		background-color: rgba(0,0,0,0.5);
		.box{
			position: relative;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			.item{
				width : 300px;
				height : 200px;
				background-color: #fff;
				margin : auto auto;
				border-radius: 4px;
			}
		}
	}
	
</style>