import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
// 引入样式
import 'vant/lib/index.less'
import 'amfe-flexible'
import 'postcss-pxtorem'
import '@/styles/index.less'
// 添加自定义过滤器 相对时间
import * as obj from '@/filters/index'

// 引入全局组件
import MyIcon from '@/components/MyIcon.vue'
import FollowUser from '@/components/FollowUser.vue'
import '@/components'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})

// 使用全局组件
Vue.component(FollowUser.name, FollowUser)
Vue.component('MyIcon', MyIcon)

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
