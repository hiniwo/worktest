<template>
	<div class="hellowork">
		<button class="layui-btn" @click="open()">测试</button>
		<div class="main">
			<section class="wow fadeInDown" style="background-color: #f1c40f;"></section>
			<section class="wow pulse" style="background-color: #e74c3c;" data-wow-iteration="infinite" data-wow-duration="1500ms"></section>
			<section class="section--purple wow slideInRight" data-wow-delay="500"></section>
			<section class="section--blue wow bounceInLeft" data-wow-offset="300"></section>
			<section class="section--green wow slideInLeft" data-wow-duration="300"></section>
			<section class="wow pulse" style="background-color: #e74c3c;" data-wow-iteration="infinite" data-wow-duration="1500ms"></section>
			<section class="section--purple wow slideInRight" data-wow-delay="500"></section>
			<section class="section--blue wow bounceInLeft" data-wow-offset="300"></section>
			<section class="section--green wow slideInLeft" data-wow-duration="300"></section>
			<button id="moar" class="layui-btn">LOAD MOAR!!</button>
		</div>
	</div>

</template>

<script>
	
	export default {
		name: "HelloWorld",
		data(){
			return {
				imgList : []
			}
		},
		mounted(){
			setTimeout(()=>{
				this.init();
			},1000)
		},
		methods :{
			init(){
				this.$nextTick(function(){
					let wow = new WOW(
						{
							animateClass: 'animated',
							offset:       100,
							callback:     function(box) {
							
							}
						}
					);
					wow.init();
					document.getElementById('moar').onclick = function() {
						var section = document.createElement('section');
						section.className = 'section--purple wow fadeInDown';
						this.parentNode.insertBefore(section, this);
					};
				})
			},
			open(){
				layer.msg('nihaoma');
			},
			getmore(){
				this.imgList.push([]);
			}
		}
	}
</script>

<style scoped lang="scss">
	.hellowork{
		text-align: center;
	}
	.wow:first-child {
		visibility: hidden;
	}
	.box{
		width : 100px;
		height:100px;
		background-color: red;
	}
	.main{
		width : 500px;
		margin: 0 auto;
	}
	h1 {
		font-size:     72px;
		line-height:   1.5;
		color: #2c3e50;
		font-weight:   100;
	}
	
	#container {
		width:  980px;
		margin: 0 auto;
	}
	
	section {
		height: 300px;
		margin: 60px 0;
	}
	
	.section--purple {
		background-color: #9b59b6;
	}
	
	.section--blue {
		background-color: #3498db;
	}
	
	.section--green {
		background-color: #2ecc71;
	}
	
	#main {
		text-align: center;
	}
	
	#more {
		margin: 20px auto 48px;
	}


</style>