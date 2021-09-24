export default {
  namespaced: true,
  state: () => ({
    address: {}
  }),
  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address
    }
  },
  getters: {}
}