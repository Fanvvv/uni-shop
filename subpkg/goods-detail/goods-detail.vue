<template>
  <view>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="item in goodsInfo.pics" :key="item.goods_id">
        <image :src="item.pics_big"></image>
      </swiper-item>
    </swiper>
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
swiper {
  height: 750rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
</style>
