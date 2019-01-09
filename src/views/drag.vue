<template>
	<div class="drag">
		<div class="outbox">
			<!--<div class="innerbox" @mousedown="move">-->
			<!---->
			<!--</div>-->
			<div>
				<p>positionX : {{positionX}}</p>
				<p>positionY : {{positionY}}</p>
				<p>clientX : {{clientX}}</p>
				<p>clientY : {{clientY}}</p>
				<p>offsetLeft : {{offsetLeft}}</p>
				<p>offsetTop : {{offsetTop}}</p>
			</div>
			<ul>
				<li @mousedown="move(n , $event)" v-for="n in 3">1</li>
			</ul>
		</div>
		<draggable v-model="myArray">
			<transition-group>
				<div class='layui-input-block' v-for="element in myArray" :key="element.id">
					<button class="layui-btn">{{element.name}}</button>
				</div>
			</transition-group>
		</draggable>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	export default {
		name: "drag",
		components:{draggable},
		data(){
			return {
				myArray:[
					{id : 1 , name : 'dd' },
					{id : 2 , name : 'kk' },
					{id : 3 , name : 'll' }],
				positionX : 0,
				positionY : 0,
				clientX : 0,
				clientY : 0,
				offsetLeft : 0,
				offsetTop : 0
			}
		},
		methods:{
			move(n,e){
				let odiv = e.target;        //获取目标元素
				//算出鼠标相对元素的位置
				console.log(e);
				let disX = e.clientX - odiv.offsetLeft;
				let disY = e.clientY - odiv.offsetTop;
				this.clientX = e.clientX;
				this.clientY = e.clientY;
				this.offsetLeft = e.offsetLeft;
				this.offsetTop = e.offsetTop;
				document.onmousemove = (e)=>{       //鼠标按下并移动的事件
					//用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
					let left = e.clientX - disX;
					let top = e.clientY - disY - (n-1)*100;
					
					//绑定元素位置到positionX和positionY上面
					this.positionX = top;
					this.positionY = left;
					
					//移动当前元素
					odiv.style.left = left + 'px';
					odiv.style.top = top + 'px';
				};
				document.onmouseup = (e) => {
					document.onmousemove = null;
					document.onmouseup = null;
				};
			}
			
		
		}
	}
</script>

<style scoped lang="scss">
.drag{
	padding-top: 20px;
	padding-left: 20px;
	.outbox{
		.innerbox{
			position: absolute;
			width : 100px;
			height: 100px;
			background-color: #ff5669;
		}
	ul{
		position: relative;
		li{
			position: relative;
			width : 100px;
			height: 100px;
			&:nth-child(2n){
				background-color: #00F7DE;
			}
			&:nth-child(2n+1){
				background-color: #00FF00;
			}
		}
	}
	}
}
	.layui-btn{
		margin: 10px 0;
	}
</style>