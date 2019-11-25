<template>
	<div id="bg">
		<div class="login-box">
			<form class="login-form">
				<input type="text" v-model="userDto.mobile" id="mobile" />
				<input type="password" v-model="userDto.password" />
				<input type="button" class="btn btn-lg dark-fill" value="注册" @click="signUp(userDto)" />
				<router-link to="/sign-in">已有账号？去登录</router-link>
			</form>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			userDto: {
				mobile: '',
				password: ''
			}
		};
	},
	created() {
		var number = Math.ceil(Math.random() * 10);
		this.codeUrl = this.GLOBAL.baseUrl + '/code?num = ' + number;
	},
	methods: {
		signUp(userDto) {
			this.axios({
				method: 'post',
				url: this.GLOBAL.baseUrl + '/user/sign-up',
				data: JSON.stringify(this.userDto)
			}).then(res => {
				if (res.data.msg === '成功') {
					alert('注册成功');
					this.$router.push('/sign-in');
				} else {
					alert(res.data.msg);
				}
			});
		}
	}
};
</script>
<style scoped>
#bg {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url(../assets/img/topic.png);
}
.login-box {
	width: 450px;
	height: 300px;
	border: 2px solid rgb(170, 208, 95);
	border-radius: 10px;
	background-color: rgb(170, 208, 95, 0.6);
	position: absolute;
	top: 200px;
	left: 30%;
}
.login-form {
	padding-top: 40px;
	width: 70%;
	margin: 0 auto;
	text-align: left;
}
.login-form input {
	width: 100%;
	height: 35px;
	outline: none;
	border: none;
	margin-bottom: 20px;
	border-radius: 5px;
}
</style>
