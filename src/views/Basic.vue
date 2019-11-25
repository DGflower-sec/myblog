<template>
	<div class="container">
		<img :src="user.avatar"  class="avatar">
		<h2>{{user.nickname}}</h2>
		<p>{{user.address}}</p>
		<p>{{user.gender}}</p>
		<p>{{user.introdunction}}</p>
		<p><a :href="user.homepage"></a></p>
		<p>关注了{{user.follows}}个人</p>
		<p>{{user.fans}}个粉丝</p>
		<p>写了{{user.fans}}篇文章</p>
		<p>{{user.createTime.date.year}}年{{user.createTime.date.month}}月{{user.createTime.date.day}}日加入</p>
	</div>
</template>

<script>
export default {
	data() {
		return {
			user: JSON.parse(localStorage.getItem('user'))
		};
	},
	mounted() {},
	created() {},
	computed: {},
	methods: {}
};
</script>

<style scoped="scoped">
	.container{
		padding: 10px;
	}
</style>