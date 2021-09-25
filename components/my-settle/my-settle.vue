<template>
  <view class="my-settle-container">
    <!-- 全选区域 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
    </label>
    <!-- 合计区域 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{ checkedGoodsAmount }}</text>
    </view>
    <!-- 结算按钮 -->
    <view class="btn-settle" @click="settlement">结算({{ checkedCount }})</view>
  </view>
</template>

<script>
  import { mapGetters, mapMutations, mapState } from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapGetters('cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      ...mapGetters('user', ['fullAddress']),
      ...mapState('user', ['token']),
      // 是否全选
      isFullCheck() {
        return this.total === this.checkedCount
      }
    },
    methods: {
      ...mapMutations('cart', ['updateAllGoodsState']),
      // 改变全部状态
      changeAllState() {
        this.updateAllGoodsState(!this.isFullCheck)
      },
      // 结算前的判断
      settlement() {
        // 判断是否选择的商品
        if (!this.checkedCount) return uni.$showMsg('请勾选想要结算的商品')
        // 判断是否选择了收货地址
        if (!this.fullAddress) return uni.$showMsg('请选择收货地址')
        // 判断是否登录了
        if (!this.token) return uni.$showMsg('请先登录')
      }
    }
  }
</script>

<style lang="scss">
.my-settle-container {
  /* 底部固定定位 */
  position: fixed;
  bottom: 0;
  left: 0;
  /* 设置宽高和背景色 */
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;
  z-index: 2;
  .radio {
    display: flex;
    align-items: center;
  }
  .amount {
    color: #c00000;
  }
  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #c00000;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}
</style>
