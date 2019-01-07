/**
 * 登录页面的逻辑处理
 */
import Component from 'm@/component';
import Request from 'm@/requestor';
import rule from 'm@/rule';
import captch from 'c@/common/captch'
import loading from 'c@/common/loading-image'
import tipMsg from 'c@/common/alert'
import HHUrl from 'm@/HHUrl';
import strhelper from 'm@/string-helper';

export default Component.instance()
    //初始化下列变量为空字符串
	.initData('phone, password, captch_code_default')
	.component({
        captch,
        tipMsg,
        loading
	})
	.lcMounted(function() {
		let captch = this.$refs.captch;
		let self = this;
		captch.onload(function() {
			let input = self.$refs.captchInput;
			input.value = '';
			input.focus();
		});
	})
	.method({
		login() {
			if(this.$refs.loginButton.hasAttribute('disabled')) {
				return ;
			}
			
			let phoneInput = this.$refs.phoneInput;
			let passwordInput = this.$refs.passwordInput;
			let captchInput = this.$refs.captchInput;
			let loginButtonText = this.$refs.loginButtonText;
			
			let self = this;
			if(!rule.phonerule(this.phone)){
                this.$refs.tipMsg.setMidMsg('请正确输入手机号');
                this.$refs.tipMsg.show();
				phoneInput.select();
				return;
			}
			if(HHCommon.isEmpty(this.password)){
                this.$refs.tipMsg.setMidMsg('密码不能为空');
                this.$refs.tipMsg.show();
				passwordInput.select();
				return;
			}
			if(HHCommon.isEmpty(this.captch_code_default)){
                this.$refs.tipMsg.setMidMsg('验证码不能为空');
                this.$refs.tipMsg.show();
				captchInput.focus();
				return;
			}
			
			this.logging(true);
			
			//创建api请求. Request 是基于jQuery 的 ajax
			Request(this.URL.LOGIN_API)
				.params({
					phone: this.phone,
					password: this.password,
					captch_code_default: this.captch_code_default,
				})
				
                //api调用成功
				.success(function () {
					let url = HHUrl();
					let redirect = url.getParam('redirect');
					
					if(!redirect) {
						redirect = this.result.data.redirect;
					}
					
					redirect = strhelper.trim(redirect);
					
					if(redirect[0] != '/' && !/^https?:\/\//i.test(redirect)) {
						redirect = "/" + redirect;
					}
					
					if(redirect) {
						loginButtonText.innerHTML = "正在跳转";
						HHCommon.goto(redirect);
					} else {
						self.logging(false);
					}
				})
				//api调用失败(包含客户端错误和服务端错误,其中,服务端错误包含逻辑错误)
				.fail(function () {
					self.logging(false);
					
					if(this.result.code == 'CAPTCH_ERROR') {
						self.$refs.captch.refresh();
						self.captch_code_default = '';
						self.$refs.captchInput.focus();
						
						// 验证码错误, 刷新验证码
                        self.$refs.tipMsg.setMidMsg('验证码错误');
                        self.$refs.tipMsg.show();
					}
				})
				.post()
			;
		},
		
		logging(loading) {
			let loginLoading = this.$refs.loginLoading;
			let loginButton = this.$refs.loginButton;
			let loginButtonText = this.$refs.loginButtonText;
			
			if(loading) {
				// loginLoading.show();
				loginButton.classList.add('loading');
				loginButton.setAttribute('disabled', 1);
				loginButtonText.innerHTML = loginButtonText.getAttribute('logging-text');
			} else {
				// loginLoading.hide();
				loginButton.classList.remove('loading');
				loginButton.removeAttribute('disabled');
				loginButtonText.innerHTML = loginButtonText.getAttribute('default-text');
			}
		},
		
		_enterSubmit(e) {
			if(e.key.toUpperCase() == 'ENTER') {
				this.login();
			}
		}
	})
	
	.exports()
;

