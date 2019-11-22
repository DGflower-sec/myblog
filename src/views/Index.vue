<template>
	<div class="su-row">
		
		<div class="su-col-4 su-fxc-top">
			<div class="special">
				
			</div>
			<div class="author">
				
			</div>
		</div>
		<div class="su-col-8">
			<div class="card su-fx-around su-shadow" v-for="(article, index) in articles.slice(20, 30)" :key="index">
				<div class="img su-btn"><img :src="article.picture" alt="" /></div>
				<div class="contant">
					<div class="head su-fx-center su-title su-btn">
						<router-link to=""><span>{{article.title.substring(0,20)}}...</span></router-link>
						<!-- <span>{{article.create_time}}</span> -->
					</div>
					
					<p class="article su-btn">{{ article.introduction }}</p>
					<div class="bottom su-fx-around">
						<li class="su-btn"><i class="iconfont likes">&#xe621;</i>{{article.likes}}</li>
						<li class="su-btn"><i class="iconfont nolikes">&#xe61d;</i>{{article.noLikes}}</li>
						<li class="su-btn"><i class="iconfont reply">&#xe67b;</i>{{article.reply}}</li>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			user : JSON.parse(localStorage.getItem('user')),
			articles: []
		};
	},
	created() {
		this.axios.get('http://localhost:8080/api/article').then(res => {
			console.log(res.data.data);
			this.articles = res.data.data;
			for (var i = 0; i < this.articles.length; i++) {
				this.articles[i].picture = this.getImage(this.articles[i].picture);
			}
			this.user.avatar = this.getImage(this.user.avatar);
		});
		
	},
	methods: {
		getImage(url) {
			return 'https://images.weserv.nl/?url=' + url;
		}
	},
	computed: {}
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
	    -moz-osx-font-smoothing: grayscale;
		}
	.likes{
		font-size: 20px;
		color: hotpink;
	}
	.nolikes{
		font-size: 20px;
		color: #AAAAAA;
	}
.su-row {
	/* height: 800px; */
}


.su-col-4 {
	background-color:rgb(255, 243, 224);
}
.special{
	margin-top: 38px;
	width: 90%;
	height: 300px;
	border: 1px solid #009688;
}
.author{
	margin-top: 38px;
	width: 90%;
	height: 600px;
	border: 1px solid #FF0000;
}

.su-col-8 {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	flex-direction: column;

	/* opacity: 0.9; */
}
.card {
	width: 95%;
	height: 230px;
	display: flex;
	background-color: rgb(232, 245, 233);
	/* border: 1px solid #B4B4B4; */
	border-radius: 15px;
	margin: 4%;
	display: flex;
	
}
.img {
	width: 25%;
	height: 90%;
	/* border: 2px solid #ff0000; */
}
.img img {
	width: 100%;
	height: 100%;
	border-radius: 10px;
}
.head{
	font-size: 22px;
	font-weight: 350;
}
.article{
	margin-top: 3%;
	padding: 10px;
	text-indent: 2em;
	/* border: 2px solid #EEEEEE; */
}
.bottom{
	margin-bottom: 10px;
	width: 100%;
	height: 18%;
	bottom: 0;
	/* border: 2px solid #ff0000; */
}
li{
	list-style: none;
	color: #333333;
}
.contant {
	width: 70%;
	height: 95%;
	/* border: 2px solid  #B4B4B4; */
}
</style>
