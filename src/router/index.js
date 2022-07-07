import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const Video = () => import('@/views/Video')
const Question = () => import('@/views/Question')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
const Search = () => import('@/views/Search')
const Article = () => import('@/views/Article')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', component: Home, name: 'Home' },
      { path: 'video', component: Video, name: 'Video' },
      { path: 'question', component: Question, name: 'Question' },
      { path: 'my', component: My, name: 'my' }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  },
  {
    path: '/search',
    component: Search,
    name: 'Search'
  },
  {
    path: '/article/:article_id',
    component: Article,
    name: 'Article',
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
