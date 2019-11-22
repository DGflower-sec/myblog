<template>
	<div>
		<div class="su-nav su-fx-around">
			<ul class="ul-left su-fx-around">
				<span><i class="iconfont i-size">&#xe623;</i></span>
				<li>
					<router-link to="/">
						<i class="iconfont">&#xe6ce;</i>
						主页
					</router-link>
				</li>
				<li>
					<router-link to="/c">
						<i class="iconfont">&#xe619;</i>
						专题
					</router-link>
				</li>
				<li>
					<router-link to="/p">
						<i class="iconfont">&#xe661;</i>
						文章
					</router-link>
				</li>
				<li>
					<router-link to="/u">
						<i class="iconfont">&#xe688;</i>
						作者
					</router-link>
				</li>
			</ul>
			<ul class="center su-fx-center">
				<input type="text" placeholder="查找相关" />
				<button><i class="iconfont i-buttom su-btn">&#xe60f;</i></button>
			</ul>
			<ul class="su-fx-right ul-right ">
				<ul class="su-fx-around right-box" v-if="!this.user">
					<li><router-link to="">下载APP</router-link></li>
					<li><router-link to="/sign">登录</router-link></li>
				</ul>
				<ul class="su-fx-around" v-if="this.user">
					<div class="box">
						<router-link to="/userDetaile"><img :src="user.avatar" /></router-link>
					</div>
					<div class="box su-btn"><span @click="logout()">退出</span></div>
				</ul>
			</ul>
		</div>
		<router-view class="su-container container" />

		<footer></footer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: JSON.parse(localStorage.getItem('user'))
		};
	},
	created() {
		this.user.avatar = this.getImage(this.user.avatar);
	},
	methods: {
		logout() {
			// localStorage.setItem('user',this.user)
			alert('tuichu');
			this.user = null;
			localStorage.clear();
		},
		getImage(url) {
			return 'https://images.weserv.nl/?url=' + url;
		}
	}
};
</script>

<style scoped>
@font-face {
	font-family: 'iconfont'; /* project id 1434155 */
	src: url('//at.alicdn.com/t/font_1434155_7l5xbu4i3wu.eot');
	src: url('//at.alicdn.com/t/font_1434155_7l5xbu4i3wu.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_1434155_7l5xbu4i3wu.woff2') format('woff2'),
		url('//at.alicdn.com/t/font_1434155_7l5xbu4i3wu.woff') format('woff'), url('//at.alicdn.com/t/font_1434155_7l5xbu4i3wu.ttf') format('truetype'),
		url('//at.alicdn.com/t/font_1434155_7l5xbu4i3wu.svg#iconfont') format('svg');
}

.iconfont {
	font-family: 'iconfont' !important;
	font-weight: 900;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}
.i-size {
	font-size: 35px;
	color: red;
}
.container {
	/* height: 100%; */
	/* background-color: #aaaaaa; */
}
ul {
	display: flex;
}
.su-nav {
	background-color: rgb(200, 230, 201);
}
.ul-left {
	width: 50%;
	height: 100%;
}
.center {
	width: 30%;
	height: 100%;
}
input {
	border: none;
	width: 60%;
	height: 45%;
	text-align: center;
	font-size: 20px;
	font-weight: 500;
}
button{
	border: none;
	width: 10%;
	height: 45%;
	text-align: center;
	font-size: 15px;
	background-color: #FFFFFF;
}
.i-buttom{
	font-size: 25px;
}
.ul-right {
	width: 25%;
	height: 100%;
	justify-content: space-between;
	/* background-color: #FFE4C4; */
}
li {
	font-size: 25px;
	font-weight: 800;
	color: cadetblue;
	opacity: 0.5;
}
.right-box {
	width: 100%;
	height: 100%;
}
.box {
	width: 30%;
	height: 80%;
	align-content: center;
	font-size: 25px;
	font-weight: 800;
	/* background-color: #A9A9A9; */
}
.su-btn {
	opacity: 0.5;
	color: cadetblue;
}
.box img {
	width: 80%;
	border-radius: 50%;
}
</style>
