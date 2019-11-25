<template>
	<div>
		<div class="su-row">
			<div v-for="(item, index) in topics" :key="index" class="col-4 flex flex-center">
				<div class="card shadow flex flex-top-y">
					<div class="card-head flex flex-center">
						<p class="title">{{ item.topicName }}</p>
						<img :src="item.logo"/>
					</div>
					<div class="card-body flex flex-left">
						<p class="sub-title">{{ item.description.slice(0,30) }}</p>
						<p class="meta">{{ item.articles }}篇文章，{{ item.fans }}人关注</p>
					</div>
					<div><a :href="item.homepage" class="link" @click="go(item.homepage)">专题主页</a></div>
				</div>
			</div>
		</div>
		<div class="row"><button class="btn btn-lg btn-rd dark-fill" @click="loadMore">点击加载更多</button></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			topics: [],
			currentPage: 1,
			count: 6
		};
	},
	created() {
		this.axios
			.get(this.GLOBAL.baseUrl + '/topic', {
				params: {
					page: this.currentPage,
					count: this.count
				}
			})
			.then(res => {
				console.log(res.data.data.length);
				this.topics = res.data.data;
			});
	},
	methods: {
		loadMore() {
			this.currentPage = this.currentPage + 1;
			this.axios
				.get(this.GLOBAL.baseUrl + '/topic', {
					params: {
						page: this.currentPage,
						count: this.count
					}
				})
				.then(res => {
					console.log(res.data.data.length);
					let temp = [];
					temp = res.data.data;
					for (var i = 0; i < temp.length; i++) {
						this.topics.splice(this.currentPage * this.count, 0, temp[i]);
					}
					console.log(this.topics.length);
				});
		},
		go(page) {
			window.location.href = page;
		}
	}
};
</script>
<style scoped>
.card {
	width: 90%;
	height: 300px;
	background-image: url(../assets/img/topic.png);
	background-size: 100%, 100%;
	margin-bottom: 50px;
	padding: 20px;
}
.card-head {
	height: 30%;
	padding: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.card-head img {
	width: 80px;
	height: 80px;
	border-radius: 10px;
	margin-left: 20px;
}
.card-body {
	width: 80%;
	margin: 0 auto;
}
.card-body > p {
	line-height: 30px;
}
.card a {
	color: rgb(0, 98, 89);
	font-weight: 700;
}
</style>