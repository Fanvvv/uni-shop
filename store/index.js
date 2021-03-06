import Vue from "vue"
import Vuex from 'vuex'
import cart from './modules/cart.js'
import user from './modules/user.js'

// 使用 vuex 插件
Vue.use(Vuex)

const store = new Vuex.Store({
  // 挂载 store 模块
  modules: {
    cart,
    user
  }
})

export default store

