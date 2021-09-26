export default {
  namespaced: true,
  state: () => ({
    // 获取本地储存的地址
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: uni.getStorageSync('token') || '',
    userInfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    // 重定向的对象
    redirectInfo: null
  }),
  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address
      // 对 address 持久化
      this.commit('user/saveAddressToStorage')
    },
    // 将 address 持久化存储到本地
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    // 更新用户信息
    updateUserInfo(state, info) {
      state.userInfo = info
      this.commit('user/saveUserInfoToStorage')
    },
    // 将 userInfo 持久化存储到本地
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userInfo))
    },
    // 更新 token
    updateToken(state, token) {
      state.token = token
      this.commit('user/saveTokenToStoreage')
    },
    // 将 token 持久化存储到本地
    saveTokenToStoreage(state) {
      uni.setStorageSync('token', state.token)
    },
    // 更新重定向信息
    updateRedirectInfo(state, info) {
      // info 为 { openType, from }
      state.redirectInfo = info
    }
  },
  getters: {
    // 拼接完整地址
    fullAddress(state) {
      if (!state.address.provinceName) return ''
      // 返回完整地址
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}