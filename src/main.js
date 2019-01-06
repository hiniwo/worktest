import Vue from 'vue'
import App from './App.vue'
import '@/static/style/animate.css'
import '@/static/layer/css/layui.css'
Vue.config.productionTip = false;
var oscript = document.createElement('script');
oscript.src = '/layer/layui.all.js';
document.body.append(oscript);
var oscriptw = document.createElement('script');
oscriptw.src = '/layer/wow.js';
document.body.append(oscriptw);
new Vue({
  render: h => h(App),
}).$mount('#app');
