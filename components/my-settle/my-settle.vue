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
        seconds: 3, // 倒计时的秒数
        timer: null
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
      ...mapMutations('user', ['updateRedirectInfo']),
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
        // if (!this.token) return uni.$showMsg('请先登录')
        // 如果没有登录，则多少秒后跳转到登录页
        if (!this.token) return this.delayNavigate()
      },
      // 提示信息
      showTips(n) {
        uni.showToast({
          icon: 'none',
          // 提示的消息
          title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
          // 为页面添加透明遮罩，防止点击穿透
          mask: true,
          // 1.5 秒后自动消失
          duration: 1500
        })
      },
      // 延时跳转
      delayNavigate() {
        // 把 data 中的秒数重置成 3 秒
        this.seconds = 3
        this.showTips(this.seconds)
        // 创建定时器，每隔一秒钟执行一次
        this.timer = setInterval(() => {
          // 先让秒数自减 1
          this.seconds--
          if (this.seconds <= 0) {
            // 清除定时器
            clearInterval(this.timer)
            // 跳转到 my 页面
            uni.switchTab({
              url: '/pages/my/my',
              // 跳转成功后的回调
              success: () => {
                this.updateRedirectInfo({
                  // 跳转的方式
                  openType: 'switchTab',
                  // 跳转到哪个页面
                  from: '/pages/cart/cart'
                })
              }
            })
            // 终止后续代码的运行（当秒数为 0 时，不再展示 toast 提示消息）
            return
          }
          // 再根据最新的秒数，进行消息提示
          this.showTips(this.seconds)
        }, 1000)
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
