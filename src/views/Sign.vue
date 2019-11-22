<template>
	<div>
		<h2><router-link to="/">主页</router-link></h2>
		<div class="sign-container su-fx-center">
			<div class="sign su-shadow">
				<div class="tab">
					<span class="tab-itme su-btn" :class="{ active: isActive }" @click="changeTab">登录</span>
					<span class="tab-itme su-btn" :class="{ active: !isActive }" @click="changeTab">注册</span>
				</div>
				<div class="sign-box su-fx-around su-shadow" v-show="show && selected === 0">
					<label>{{ mobileTip }}</label>
					<input type="text" placeholder="请输入手机号" v-model="userDto.mobile" minlength="11" maxlength="11" @keyup="checkAccount" @focusin="clearCode" />
					<label>{{ passwordTip }}</label>
					<input type="password" placeholder="请输入密码" v-model="userDto.password" @focusin="clearCode" />
					<div class="su-fx-between">
						<input type="text" class="text-code" placeholder="请输入验证码" v-model="verifyCode" @focusin="clearCode" />
						
					</div>
					<input type="button" class="su-btn" value="登录" @click="signIn(userDto)" />
				</div>
				<div class="sign-box su-fx-around su-shadow" v-show="show && selected === 1">
					<label>{{ mobileTip }}</label>
					<input
						type="text"
						placeholder="请输入手机号"
						v-model="userDto.mobile"
						minlength="11"
						maxlength="11"
						required="required"
						@keyup="checkAccount"
						@focusin="clearCode"
					/>
					<label>{{ passwordTip }}</label>
					<input type="password" placeholder="请输入密码" v-model="userDto.password" @focusin="clearCode" />
					<label>{{ verifyTip }}</label>
					<div class="su-fx-between">
						<input type="text" class="text-code" placeholder="请输入验证码" v-model="verifyCode" @focusin="clearCode" />
						<button class="su-btn btn-normal" @click="getCode" :disabled="codeDisabled" :class="{ btnDisabled: btnDisabled }" @focusin="clearCode">{{ msg }}</button>
					</div>
					<input type="button" class="su-btn" value="确定" @click="signUp(userDto)" />
				</div>
			</div>
		</div>
		<transition name="bounce">
			<div class="toast middle" v-if="toastShow"><img src="https://www.easyicon.net/api/resizeApi.php?id=27967&size=128" alt="" /></div>
		</transition>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// user:JSON.parse(localStorage.getItem('user')),
			isActive: true,
			show: true,
			toastShow: false,
			selected: 0,
			mobileTip: '',
			passwordTip: '',
			verifyCode: '',
			verifyTip: '',
			btnDisabled: false,
			switchCss: false,
			countdown: 10,
			fade: 2,
			msg: '获取验证码',
			timer: null,
			timer1: null,
			code: '',
			userDto: {
				mobile: '',
				password: ''
			}
		};
	},
	methods: {
		changeTab: function() {
			this.isActive = !this.isActive;
			this.selected = this.selected == 0 ? 1 : 0;
			this.clearAccount();
			this.clearCode();
		},
		clearAccount: function() {
			this.userDto.mobile = '';
			this.userDto.password = '';
			this.verifyCode = '';
		},
		clearCode: function() {
			this.mobileTip = '';
			this.passwordTip = '';
			this.verifyTip = '';
		},
		signIn(userDto) {
			// alert("登录")
			if (this.userDto.mobile == '') {
				this.mobileTip = '手机号码不能为空';
				return;
			}
			if (!/^1[34578]\d{9}$/.test(this.userDto.mobile)) {
				this.mobileTip = '手机号码格式错误';
				this.userDto.mobile = '';

				return;
			}
			if (this.userDto.password == '') {
				this.passwordTip = '密码不能为空';
				return;
			}
			this.axios.post('http://localhost:8080/api/user/sign-in', JSON.stringify(this.userDto)).then(response => {
				alert(response.data.msg);
				this.clearAccount();
				if (response.data.msg == '登录成功') {
					//将后台的用户信息存入本地存储
					localStorage.user = JSON.stringify(response.data.data);
					//路由跳转
					this.clearAccount();
					this.$router.push('/');
				}
			});
		},
		signUp(userDto) {
			if (this.userDto.mobile == '') {
				this.mobileTip = '手机号码不能为空';
				return;
			}
			if (!/^1[34578]\d{9}$/.test(this.userDto.mobile)) {
				this.mobileTip = '手机号码格式错误';
				this.userDto.mobile = '';

				return;
			}
			if (this.userDto.password == '') {
				this.passwordTip = '密码不能为空';
				return;
			}

			if (this.verifyCode == '') {
				this.verifyTip = '验证码不能为空';
				return;
			}
			if (this.verifyCode != this.code) {
				this.verifyTip = '验证码错误';
				this.verifyCode = '';
				return;
				
			}
			this.axios.post('http://localhost:8080/api/user/sign-up', JSON.stringify(this.userDto)).then(response => {
				alert(response.data.msg);
				if (response.data.msg == '注册成功') {
					localStorage.user = JSON.stringify(response.data.data);
					// this.toast()
					this.$router.push('/');
				}
				this.clearAccount();
			});
		},
// 		submit: function() {
// 			if (this.userDto.mobile == '') {
// 				this.mobileTip = '手机号码不能为空';
// 				return;
// 			}
// 			if (!/^1[34578]\d{9}$/.test(this.userDto.mobile)) {
// 				this.mobileTip = '手机号码格式错误';
// 				this.userDto.mobile = '';
// 
// 				return;
// 			}
// 			if (this.userDto.password == '') {
// 				this.passwordTip = '密码不能为空';
// 				return;
// 			}
// 
// 			if (this.verifyCode == '') {
// 				this.verifyTip = '验证码不能为空';
// 				return;
// 			}
// 			if (this.verifyCode != this.code) {
// 				this.verifyTip = '验证码错误';
// 				this.verifyCode = '';
// 				return;
// 			}
// 		},
		toast: function() {
			if (!this.timer1) {
				this.toastShow = !this.toastShow;
				this.timer1 = setInterval(() => {
					if (this.fade > 0 && this.fade <= 2) {
						this.fade--;
						if (this.fade == 0) {
							clearInterval(this.timer1);
							this.toastShow = !this.toastShow;
							this.fade = 2;
							this.timer1 = null;
						}
					}
				}, 1000);
			}
		},
		checkAccount: function() {
			if (this.account.length == 11) {
				if (!/^1[34578]\d{9}$/.test(this.account)) {
					return;
				} else {
					this.switchCss = true;
				}
			} else {
				this.switchCss = false;
				return;
			}
		},

		getCode() {
			if (!this.timer) {
				this.timer = setInterval(() => {
					if (this.countdown > 0 && this.countdown <= 10) {
						this.countdown--;
						if (this.countdown != 0) {
							this.btnDisabled = true;
							this.switchCss = false;
							this.msg = '重新发送(' + this.countdown + ')';
						} else {
							clearInterval(this.timer);
							this.msg = '获取验证码';
							this.countdown = 10;
							this.timer = null;
							this.switchCss = true;
							this.btnDisabled = false;
						}
					}
				}, 100);
				this.code = this.getRandomNumber();
				alert(this.code);
			}
		},
		messge() {
			if (!this.timer) {
				this.timer = setInterval(() => {
					if (this.countdown1 > 0 && this.countdown1 <= 3) {
						this.countdown1--;
						if (this.countdown1 != 0) {
							this.pop = true;
						} else {
							clearInterval(this.timer);
							this.countdown1 = 3;
							this.timer = null;
							this.pop = false;
						}
					}
				}, 1000);
			}
		},
		getRandomNumber: function() {
			var result = [];
			for (var i = 0; i < 4; i++) {
				var ranNum = Math.ceil(Math.random() * 10); //生成一个0到10的数字
				result.push(String.fromCharCode(65 + ranNum));
			}
			var str = result.join('');
			console.log(str);
			return str;
		}
	}
};
</script>

<style scoped>
	@font-face {
	  font-family: 'iconfont';  /* project id 1434155 */
	  src: url('//at.alicdn.com/t/font_1434155_7l5xbu4i3wu.eot');
	  src: url('//at.alicdn.com/t/font_1434155_7l5xbu4i3wu.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1434155_7l5xbu4i3wu.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1434155_7l5xbu4i3wu.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1434155_7l5xbu4i3wu.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1434155_7l5xbu4i3wu.svg#iconfont') format('svg');
	}

.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
h2 {
	font-size: 30px;
	color: #E0E0E0;
}

.sign-container {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgb(237, 244, 237);
	/* background-image: linear-gradient(to right, #bf30ac 0%, #0f9d58 100%);
	box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 7px 10px 0 rgba(0, 0, 0, 0.12); */
	z-index: -10;
}
.sign {
	width: 25%;
	height: 50%;
	border-radius: 10px;
	background-color: lightcyan;
	flex-direction: column;
}
.tab {
	display: flex;
	width: 100%;
	height: 13%;
	align-items: center;
	background-color: #dddddd;
	border-radius: 10px;
}
.tab-itme {
	display: flex;
	flex: 1 50%;
	justify-content: center;
	align-items: center;
	height: 100%;
	border-radius: 10px;
	font-size: 15px;
}
.active {
	background-color: #ffe4c4;
	color: darkgray;
	font-weight: 600;
	border-bottom: 3px solid #008000;
	font-size: 25px;
}
.sign-box {
	width: 100%;
	height: 100%;
	border-radius: 10px;
	background-color: lightcyan;
	flex-direction: column;
}
input {
	width: 80%;
	height: 12%;
	border-radius: 10px;
	text-align: center;
	border: 0;
	font-size: 20px;
}
label {
	font-size: 15px;
	color: red;
}
.su-btn:hover {
	background-color: burlywood;
}
.su-fx-between {
	width: 80%;
	height: 12%;
	border-radius: 10px;
}
.btnDisabled {
	background-color: #ddd;
	color: #333;
}
.text-code {
	width: 60%;
	height: 100%;
	border-radius: 10px;
}
.btn-normal {
	width: 30%;
	height: 100%;
	border-radius: 10px;
	background-color: #fb8c00;
}
.messge {
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1500;
	position: absolute;
	bottom: 50%;
	left: 40%;
	width: 30%;
	height: 15%;
	background-color: darkgray;
	border-radius: 50px;
	opacity: 0.6;
}
</style>
