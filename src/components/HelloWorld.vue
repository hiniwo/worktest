<template>
	<div class="hellowork">
		<div class="box animated bounceInDown"></div>
		<div>
			<button class="layui-btn" @click="open()">测试</button>
		</div>
	</div>

</template>

<script>
	export default {
		name: "HelloWorld",
		methods :{
			open(){
				layer.msg('nihaoma');
			}
		}
	}
</script>

<style scoped lang="scss">
	.box{
		width : 100px;
		height:100px;
		background-color: red;
	}

</style>