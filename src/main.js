import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
import 'amfe-flexible'
import 'postcss-pxtorem'
import MyIcon from '@/components/MyIcon.vue'
import '@/styles/index.less'
// 添加自定义过滤器 相对时间
import * as obj from '@/filters/index'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})

Vue.component('MyIcon', MyIcon)

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
