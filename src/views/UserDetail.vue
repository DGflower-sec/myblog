<template>
	<div class="container">
		<div class="banner flex flex-center"><img :src="userVo.user.banner" class="cover shadow" /></div>
		<div class="info">
			<img :src="userVo.user.avatar" class="avatar" />
			<p>{{ userVo.user.nickname }}</p>
			<!-- <p>{{ userVo.user.introduction.slice(0, 20) }}...</p> -->
		</div>
		<div class="row">
			<div class="col-8">
				<div class="col-12" v-for="(item, index) in userVo.articleList" :key="index">
					<div class="media-wraaper shadow">
						<div class="media-left"><img :src="item.article.thumbnail" class="thumnail-xs" /></div>
						<div class="media-middle">
							<p class="title">{{ item.article.title }}</p>
							<p class="sub-title">{{ item.article.summary }}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="col-4"></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			userVo: {
				user: {},
				articleList: {}
			}
		};
	},
	created() {
		var id = this.$route.params.id;
		this.axios.get(this.GLOBAL.baseUrl + '/user/' + id).then(res => {
			console.log(res.data.data);
			this.userVo = res.data.data;
		});
	},
	methods: {}
};
</script>

<style scoped="scoped">
.banner {
	width: 100%;
	height: 300px;
}
.cover {
	width: 100%;
	height: 100%;
	border-radius: 10px;
}
.info {
	position: relative;
	top: -60px;
	left: -400px;
	color: #fff;
	margin-bottom: -50px;
	padding: 10px;
	background-color: rgb(0, 0, 0, 0.3);
	width: 130px;
	height: 130px;
	margin: 0 auto;
	text-align: center;
	border-radius: 20px;
}
.info img {
	width: 80px;
	height: 80px;
	border-radius: 50%;
	border: 2px solid #fff;
	margin-bottom: 10px;
}
.row {
	margin-top: -50px;
}
</style>