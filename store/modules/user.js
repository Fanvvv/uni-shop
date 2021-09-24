export default {
  namespaced: true,
  state: () => ({
    // 获取本地储存的地址
    address: JSON.parse(uni.getStorageSync('address') || '{}')
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