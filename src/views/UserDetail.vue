<template>
	<div>
		<h2>userDetail</h2>
		<router-link to='/userDetail/follow'>查看关注</router-link>
		<br>
		<router-link to='/userDetail/fans'>查看粉丝</router-link>
		<router-view />
	</div>
	
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		created(){
			
		},
		methods:{
			
		},
		computed:{
			
		}
	}
</script>

<style>
</style>
