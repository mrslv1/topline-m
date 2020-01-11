import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token  处理
    user: getItem('user')
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 防止刷新数据没了  需要把数据放到本地存储之持久化
      setItem('user', state.user)
    }
  },

  actions: {
  },
  modules: {
  }
})
