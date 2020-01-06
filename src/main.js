import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './utils/register-vant' // 封装注册模块
import 'amfe-flexible' // rem适配
// 按需注册vant组件
import {
  Button,
  Cell,
  CellGroup
} from 'vant'

Vue
  .use(Button)
  .use(Cell)
  .use(CellGroup)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
