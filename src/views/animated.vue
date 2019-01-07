<template>
	<div class="animated">
		<h1>我是动画页面</h1>
		<div>
			<button class="layui-btn layui-btn-primary" @click="open()">添加元素</button>
			<button class="layui-btn" @click="getMore()">遍历操作</button>
			<button class="layui-btn layui-btn-primary" @click="add">Add</button>
			<button class="layui-btn layui-btn-primary" @click="remove">Remove</button>
		</div>
		<div>
		
		</div>
		<div>
			<ul>
				<li class="animated itemone layui-anim-scaleSpring">1</li>
				<transition name='fade' :duration = '{ enter: 1000, leave: 2000}'>
					<li v-if="show">2</li>
				</transition>
				
				<transition
						name="custom-classes-transition"
						enter-active-class="animated bounceInDown"
						leave-active-class="animated fadeOutDown"
						:duration="1000"
				>
					<li v-if="item">3</li>
				</transition>
				<li>4</li>
				<li>5</li>
			</ul>
		</div>
		<div id="list-complete-demo" class="demo">
			<button v-on:click="add">Add</button>
			<button v-on:click="remove">Remove</button>
			<transition-group
					name="list-complete"
					enter-active-class="animated bounceInDown"
					leave-active-class="animated fadeOutDown"
					tag="p">
			<span
			v-for="item in items"
			v-bind:key="item"
			class="list-complete-item"
			>
				{{ item }}
			</span>
			</transition-group>
		</div>
	
	</div>
</template>
<script>
	export default {
		name : 'animated',
		data(){
			return	{
				imgList : [],
				show : true ,
				item : false,
				items : [1,2,3,4,5,6,7,8,9],
				nextNum: 10
			}
		},
		methods	:	{
			open(){
				this.show = !this.show;
			},
			getMore(){
				this.item = !this.item;
				this.imgList.push(new Date().getTime());
			},
			randomIndex: function () {
				return Math.floor(Math.random() * this.items.length)
			},
			add: function () {
				this.items.splice(this.randomIndex(), 0, this.nextNum++)
			},
			remove: function () {
				this.items.splice(this.randomIndex(), 1)
			}
		}
	}
</script>

<style scoped lang="scss">
	ul{
		width: 200px;
		margin: 0 auto;
		li{
			width : 100px;
			height : 100px;
			display: inline-block;
			color: red;
			&:nth-child(2n){
				background-color: aqua;
			}
			&:nth-child(2n+1){
				background-color: #0000FF;
			}
		}
	}
	.list-complete-item {
		transition: all 1s;
		display: inline-block;
		margin-right: 10px;
	}
	.list-complete-enter, .list-complete-leave-to
		/* .list-complete-leave-active for below version 2.1.8 */ {
		opacity: 0;
		transform: translateY(30px);
	}
	.list-complete-leave-active {
		position: absolute;
	}
	.fade-enter{
		opacity: 0;
	}
	.fade-enter-active{
		transition: opacity;
	}
	.fade-enter-to{
		opacity: 1;
	}
	.fade-leave{
		opacity: 1;
	}
	.fade-leave-to{
		transition: opacity;
	}
	.fade-leave-to{
		opacity: 0;
	}
	.bounce-enter-active {
		animation: bounce-in .5s;
	}
	.bounce-leave-active {
		animation: bounce-in .5s reverse;
	}
	@keyframes bounce-in {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.5);
		}
		100% {
			transform: scale(1);
		}
	}
	.list-item {
		display: inline-block;
		transition: all 1s;
		margin-right: 10px;
	}
	.list-enter-active, .list-leave-active {
		transition: all 1s;
	}
	.list-enter, .list-leave-to
		/* .list-leave-active for below version 2.1.8 */ {
		opacity: 0;
		transform: translateY(30px);
	}
	.custom-classes-transition-move{
		transition: transform 2s;
	}
</style>