<template>
	<div class="layer">
		<div>
			<div class="layui-unselect layui-form-radio" :class="{'layui-form-radioed' : !show}" @click="show = !show">
				<i class="layui-icon layui-icon-circle " :class="{'layui-icon-radio' :!show , 'layui-anim-scaleSpring':!show}"></i>
				<div>男</div>
			</div>
			<div class="layui-unselect layui-form-radio" :class="{'layui-form-radioed' : show}" @click="show = !show">
				<i class="layui-icon layui-icon-circle " :class="{'layui-icon-radio' :show , 'layui-anim-scaleSpring':show}"></i>
				<div>女</div>
			</div>
			<div class="layui-unselect layui-form-checkbox " lay-skin="primary" :class="{'layui-form-checked' : show}">
				<span>写作</span>
				<i class="layui-icon layui-icon-ok"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "layer",
		data(){
			return {
				show : false
			}
		}
	}
</script>

<style scoped>

</style>