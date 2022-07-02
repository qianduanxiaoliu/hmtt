import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    searchHistoryList: [] // 搜索历史
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    // 设置搜索历史
    setSearchHistoryList (state, payload) {
      let arr = state.searchHistoryList
      arr.unshift(payload)
      arr = [...new Set(arr)] // 数组去重
      state.searchHistoryList = arr
    },
    // 删除搜索历史
    delHistory (state, payload) {
      const index = state.searchHistoryList.findIndex(item => item === payload)
      state.searchHistoryList.splice(index, 1)
    },
    // 全部删除
    delAllHistory (state) {
      state.searchHistoryList = []
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
