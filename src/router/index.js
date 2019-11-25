import Vue from 'vue'
import VueRouter from 'vue-router'
import Nav from '@/views/Nav.vue'
import Index from '@/views/Index.vue'
import Topics from '@/views/Topics.vue'
import Article from '@/views/Article.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import User from '@/views/User.vue'
import UserDetail from '@/views/UserDetail.vue'
import SignUp from '@/views/SignUp.vue'
import Sign from '@/views/Sign.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.use(VueRouter)


const routes = [{
		path: '/',
		component: Nav,
		children: [{
				path: '/',
				redirect: 'index'
			},
			{
				path: 'index',
				component: Index
			},
			{
				path: 'articles',
				component: Article
			},
			{
				path: 'article/:id',
				component: ArticleDetail
			},
			

			{
				path: 'users',
				component: User
			},
			{
				path: 'user/:id',
				component: UserDetail
			},
			
			
		]
	},
	{
		path: '/sign-in',
		component: Sign
	},
	{
		path: '/sign-up',
		component: SignUp
	}
]

const router = new VueRouter({
	routes
})

export default router
