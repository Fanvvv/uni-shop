export default {
  // 为当前模块开启命名空间
  namespaced: true,
  // 模块的 state 数据
  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
  }),
  // 模块的 mutations 方法
  mutations: {
    // 加入到购物车
    addToCart(state, goods) {
      const result = state.cart.find(x => x.goods_id === goods.goods_id)
      if (!result) {
        state.cart.push(goods)
      } else {
        result.goods_count++
      }
      // 调用保存到本地存储的方法
      this.commit('cart/saveToStorage')
    },
    // 保存到本地存储
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 更新购物车中商品的勾选状态
    updateGoodsState(state, goods) {
      const result = state.cart.find(item => item.goods_id === goods.goods_id)
      if (result) {
        // 更新对应商品的勾选状态
        result.goods_state = goods.goods_state
        // 持久化存储到本地
        this.commit('cart/saveToStorage')
      }
    }
  },
  // 模块的 getters 属性
  getters: {
    total(state) {
      let count = 0
      state.cart.forEach(goods => count += goods.goods_count)
      return count
    }
  },
}