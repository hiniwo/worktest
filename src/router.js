import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
const home = resolve => require(['@/views/Home'], resolve);
const about = resolve => require(['@/views/About'], resolve);
const animated = resolve => require(['@/views/animated'], resolve);


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
			path: "*",
			redirect: "/"
		}
	]
})


