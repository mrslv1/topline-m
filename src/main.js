import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/register-vant' // 注册  vant 组件
import 'amfe-flexible' // rem适配
import './styles/index.less' // 全局的公共样式
// 按需注册vant组件
import './utils/validation.js' // 验证组件
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
