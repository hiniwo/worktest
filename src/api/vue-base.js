import Vue from "vue";
import common from './common';
import frontendParams from './frontend-params';
import stringHelper from './string-helper';
import params from 'm@/frontend-params';


export default class HHVueBase {
	//	实例化一个对象
	static instance() {
		return new this;
	}
	
	constructor() {
	
	}
	
	computed(key, value) {
		if(common.isUndefined(this._options['computed'])) {
			this._options['computed'] = {};
		}
		
		if(arguments.length == 2) {
			this._options['computed'][key] = value;
		} else {
			this._options['computed'] = Object.assign(this._options['computed'], key);
		}
		
		return this;
	}
	
	watch(key, value) {
		if(common.isUndefined(this._options['watch'])) {
			this._options['watch'] = {};
		}
		
		if(arguments.length == 2) {
			this._options['watch'][key] = value;
		} else {
			this._options['watch'] = Object.assign(this._options['watch'], key);
		}
		
		return this;
	}
	
	content(component) {
		this._content = component;
		return this;
	}
	
	render(render) {
		this._options['render'] = render;
		return this;
	}
	
	option(key, value) {
		if(arguments.length == 2) {
			this._options[key] = value;
		} else {
			this._options = Object.assign(this._options, key);
		}
		
		return this;
	}
    
    lcBeforeCreate(callback) {
		return this.option('beforeCreate', callback);
    }
    
    lcCreated(callback) {
		return this.option('created', callback);
    }
    
    lcBeforemount(callback) {
		return this.option('beforeMount', callback);
    }
    
    lcMounted(callback) {
			return this.option('mounted', callback);
	}
 
	lcBeforeUpdate(callback) {
		return this.option('beforeUpdate', callback);
    }
    
	lcUpdated(callback) {
		return this.option('updateed', callback);
    }
    
	lcActivated(callback) {
		return this.option('activated', callback);
    }
    
    lcDeactivated(callback) {
		return this.option('deactivated', callback);
    }
    
    lcBeforeDestroy(callback) {
		return this.option('beforeDestory', callback);
    }
    
    lcDestroyed(callback) {
		return this.option('destoryed', callback);
    }
    
    lcErrorCaptured(callback) {
		return this.option('errorCaptured', callback);
    }
    
	
	mount(el) {
		this._options['el'] = el;
		return this;
	}
	
	data(key, value) {
		if(arguments.length == 2) {
			this._options['data'][key] = value;
		} else {
			this._options['data'] = Object.assign(this._options['data'], key);
		}
		return this;
	}
	
	props(prop) {
		this._options['props'] = prop;
		return this;
	}
	
	method(key, value) {
		if(common.isUndefined(this._options['methods'])) {
//			如果methods方法未定义,则是在这里定义为空对象
			this._options['methods'] = {};
		}
		
		if(common.isObject(key)) {
			this._options['methods'] = common.merge(this._options['methods'], key);
		} else {
			this._options['methods'][key] = value;
		}
		
		return this;
	}
	
	methods(key, value) {
		return this.method(key, value);
	}
	
	initData(keys, defaultValue) {
		defaultValue = common.isUndefined(defaultValue) ? '' : defaultValue;
		
		if(common.isString(keys)) {
			keys = keys.split(',').map(stringHelper.trim);
		}
		
		if(common.isArray(keys)) {
			for(let i in keys) {
				this.data(keys[i], defaultValue);
			}
		}
		
		return this;
	}
	
	clearData() {
		this._options['data'] = {};
		return this;
	}
	
	component(key, value) {
		if(!this._options['components']) {
			this._options['components'] = {};
		}
		
		if(arguments.length == 2) {
			this._options['components'][key] = value;
		} else {
			this._options['components'] = key;
		}
		return this;
	}
	router(obj){
		if(!this._options['router']) {
			this._options['router'] = {};
		}
		this._options.router = obj;
		return this;
	}
	
	vueConfig(conf, value) {
		if(arguments.length == 2) {
			Vue.config[conf] = value;
		} else {
			Vue.config = Object.assign(Vue.config, conf);
		}
		return this;
	}
	
	getVueConfig() {
		return Vue.config;
	}
	
	name(name) {
		this._options['name'] = name;
		return this;
	}
	
	exports() {
		return this._options;
	}
	
	frontendParams() {
		return frontendParams;
	}
}
