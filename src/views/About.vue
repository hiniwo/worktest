<template>
	<div class="about">
	<transition name="fade" mode="out-in">
		<component v-bind:is="view"></component>
	</transition >
	
	<h1>This is an about page</h1>
	<div>
		<button class="layui-btn layui-btn-warm" @click="show = !show">切换</button>
		<button class="layui-btn layui-btn-primary" @click="open">组件</button>
		<button class="layui-btn layui-btn-primary" @click="boxshow = !boxshow">整体</button>
		<button class="layui-btn" @click="add">添加</button>
		<button class="layui-btn" @click="deletes">删除</button>
		<button class="layui-btn" @click="addpic">添加</button>
		<button class="layui-btn" @click="deletespic">删除</button>
	</div>
	<transition
			name="fade"
			mode="out-in"
			enter-active-class="animated tada"
			leave-active-class="animated bounceOutRight"
			>
		<div v-if="show">
			<button class="layui-btn">button</button>
		</div>
	</transition>
	<transition name="fade" mode="out-in">
		<div>
			<transition-group name="list-complete" mode="out-in" tag="ul">
				<li  class="list-complete-item" v-for="item in imgList" :key="item">{{item}}</li>
				<li  class="list-complete-item" v-for="item in pic" :key="item">{{item}}</li>
			</transition-group>
		</div>
	</transition>
  </div>
</template>
<script>
	import tip from '@/components/alert'
	export  default {
		name : 'about',
		components : {tip},
		data (){
			return{
				show : false,
				tipshow : false,
				view : '',
				boxshow : false,
				imgList : [],
				pic : [],
			}
		},
		mounted() {
			console.log(typeof age)
		},
		methods : {
			open(){
				this.view = tip;
			},
			add(){
				this.imgList.unshift(new Date().getTime())
			},
			deletes(){
				this.imgList.shift()
			},
			addpic(){
				this.pic.unshift(new Date().getTime())
			},
			deletespic(){
				this.pic.shift()
			}
		}
	}
</script>

<style scoped lang="scss">
	.fade-enter-active, .fade-leave-active {
		transition: opacity 2s;
	}
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
	.fade-leave-to{
		transform: translateX(0);
	}
	.fade-move {
		transition: transform 1s;
	}
	.list-complete-item {
		transition: all 2s;
		display: inline-block;
		margin: 10px 10px;
	}
	.list-complete-enter, .list-complete-leave-to {
		transform: translateX(0px);
	}
	.list-complete-leave{
		opacity: 0;
	}
	.list-complete-leave-active {
		position: absolute;
	}
	ul{
		display: flex;
		flex-wrap: wrap;
		li{
			width : 100px;
			height : 100px;
			background-color: skyblue;
			&:nth-child(2n){
				/*background-color: #ff5669;*/
			}
		}
	}
</style>
