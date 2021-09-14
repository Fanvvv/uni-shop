<template>
  <view v-if="goodsInfo.goods_name">
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, index) in goodsInfo.pics" :key="item.goods_id">
        <image :src="item.pics_big" @click="preview(index)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息区域 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">￥{{goodsInfo.goods_price}}</view>
      <!-- 信息主体区域 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="goods-name">{{goodsInfo.goods_name}}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="yf">快递：免运费</view>
    </view>
    <!-- 商品详情信息 -->
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
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
        // 解决每张图片之间有空白的问题 解决 .webp 格式的图片在 ios 不显示的问题
        data.message.goods_introduce = data.message.goods_introduce.replace(/<img /g, '<img style="display: block;"').replace(/webp/g, 'jpg')
        this.goodsInfo = data.message
      },
      // 实现图片预览
      preview(index) {
        uni.previewImage({
          current: index,
          urls: this.goodsInfo.pics.map(item => item.pics_big)
        })
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
// 商品信息区域的样式
.goods-info-box {
  padding: 10px;
  padding-right: 0;
  .price {
    color: #c00000;
    font-size: 18px;
    margin: 10px 0;
  }
  .goods-info-body {
    display: flex;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
      padding-right: 10px;
    }
    // 收藏区域
    .favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }
  // 运费
  .yf {
    margin: 10px 0;
    font-size: 12px;
    color: gray;
  }
}
</style>
