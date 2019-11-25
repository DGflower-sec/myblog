<template>
	<div class="container">
		<div class="su-row">
			<div class="su-col-8">
				<div class="row border-bottom">
					<div class="su-col-3">
						<img :src="topicVo.topic.logo" class="avatar-lg" />
						<p class="title">{{ topicVo.topic.topicName }}</p>
					</div>
					<div class="su-col-6">
						<p>
							<span class="sub-title">{{ topicVo.topic.articles }}篇文章,</span>
							<span class="sub-title">{{ topicVo.topic.follows }}人关注</span>
						</p>
					</div>
					<div class="su-col-3"><button class="btn btn-lg btn-rd warning-fill">关注</button></div>
				</div>
				<h3 class="title">本专题文章</h3>
				<dir class="su-row">
					<div v-for="(item, index) in topicVo.articleList" :key="index" class="col-12 border-bottom">
						<div class="media-wraaper">
							<div class="media-left">
								<img :src="item.author.avatar" class="avatar-lg link" />
								<p>{{ item.author.nickname }}</p>
							</div>
							<div class="media-middle">
								<router-link :to="{ path: '/article/' + item.article.id }">
									<p>{{ item.article.title }}</p>
								</router-link>
								<p class="sub-title link">{{ item.article.summary }}</p>
								<p>
									<span class="meta gutter">{{ item.article.comments }}评论</span>
									<span class="meta">{{ item.article.likes }}喜欢</span>
								</p>
							</div>
							<div class="media-right"><img :src="item.article.thumbnail" alt="" /></div>
						</div>
					</div>
				</dir>
			</div>
			<div class="su-col-4">
				<div class="box border-bottom">
					<p class="title">专题公告</p>
					<p class="sub-title">{{ topicVo.topic.description }}</p>
					<p>
						<a :href="topicVo.homepage">{{ topicVo.topic.homepage }}</a>
					</p>
				</div>
				<div class="box border-bottom"><p>分享到:微博、微信</p></div>
				<div class="box border-bottom">
					<p class="sub-title">管理员</p>
					<img :src="topicVo.admin.avatar" class="avatar-xs" />
					<p>{{ topicVo.admin.nickname }}</p>
				</div>
				<div class="box border-bottom">
					<p class="sub-title">关注的人</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			topicVo: {}
		};
	},
	created() {
		var id = this.$route.params.id;
		this.axios.get(this.GLOBAL.baseUrl + '/topic/' + id).then(res => {
			console.log(res.data.data);
			this.topicVo = res.data.data;
		});
	},
	computed: {},
	methods: {}
};
</script>

<style scoped>
.box {
	width: 90%;
	margin: 0 auto;
	padding: 10px;
	min-height: 100px;
}
.box > p {
	line-height: 20px;
}
</style>