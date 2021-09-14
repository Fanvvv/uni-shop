<template>
  <view>
    goods-detail
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 商品详情
        goodsInfo: {}
      };
    },
    onLoad(options) {
      // 获取传入的商品 id
      const goodsId = options.goods_id
      this.getGoodsDetail(goodsId)
    },
    methods: {
      async getGoodsDetail(goodsId) {
        const { data } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id: goodsId})
        console.log(data)
        if (data.meta.status !== 200) return uni.$showMsg()
        this.goodsInfo = data.message
      }
    }
  }
</script>

<style lang="scss">

</style>
