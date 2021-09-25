export default {
  namespaced: true,
  state: () => ({
    // 获取本地储存的地址
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: '',
    userInfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
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