<template>
  <div class="home">
      <div>
          <p>我是baidu页面</p>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HHcommon from './js/common'

export default {
	data(){
		return{
		
		}
	},
	mounted() {
		var common  = new HHcommon('libai' , 'name');
		console.log(common.toString())
	}
}
</script>
