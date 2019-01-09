import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
const home = resolve => require(['@/views/Home'], resolve);
const about = resolve => require(['@/views/About'], resolve);
const animated = resolve => require(['@/views/animated'], resolve);
const drag = resolve => require(['@/views/drag'], resolve);
const layer = resolve => require(['@/views/layer'], resolve);



export default new Router({
	routes : [
		{
			path: '/',
			name: 'home',
			component: home,
		},
		{
			path: '/about',
			name: 'about',
			component: about,
		},
		{
			path: '/animated',
			name: 'animated',
			component: animated,
		},
		{
			path: '/drag',
			name: 'drag',
			component: drag,
		},
		{
			path: '/layer',
			name: 'layer',
			component: layer,
		},
		{
			path: "*",
			redirect: "/"
		}
	]
})


