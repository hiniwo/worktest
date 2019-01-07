import VueBase from "./vue-base";

export default class HHComponent extends VueBase {
	exports() {
		let o = this;
		let component = Object.assign({}, o._options);
		
		component.data = function () {
			return Object.assign({}, o._options['data']);
		};
		
		return component;
	}
	
	constructor() {
		super();
		
		this._options = {
			data: {},
		};
        
        this.data('PARAMS', window.HH_FRONTEND_PARAMS);
        this.data('URL', window.HH_FRONTEND_PARAMS.URL);
	}
}
