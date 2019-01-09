<template>
  <div id="app">
	<a href="/">
		<button class="layui-btn layui-btn-primary">home页面</button>
	</a>
	<a href="#/about">
		<button class="layui-btn">about页面</button>
	</a>
	<a href="#/animated">
		<button class="layui-btn">animated页面</button>
	</a>
	<a href="#/drag">
		<button class="layui-btn layui-btn-warm">animated页面</button>
	</a>
	<a href="#/layer">
		<button class="layui-btn layui-btn-primary">layer页面</button>
	</a>
	<router-view />
  </div>
</template>
<script>
	export default {
	
	}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
	padding-top: 10px;
	padding-left: 20px;
}
</style>
