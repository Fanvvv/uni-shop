<template>
  <view v-if="goodsInfo.goods_name" class="goods-detail">
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
    <!-- 商品导航组件 -->
    <view class="goods-nav">
      <!-- fill 控制右侧按钮的样式 -->
      <!-- options 左侧按钮的配置项 -->
      <!-- buttonGroup 右侧按钮的配置项 -->
      <!-- click 左侧按钮的点击事件处理函数 -->
      <!-- buttonClick 右侧按钮的点击事件处理函数 -->
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        // 商品详情
        goodsInfo: {},
        // 左侧按钮组的配置对象
        options: [{
          icon: 'shop',
          text: '店铺'
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        // 右侧按钮组的配置对象
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    onLoad(options) {
      // 获取传入的商品 id
      const goodsId = options.goods_id
      this.getGoodsDetail(goodsId)
    },
    computed: {
      ...mapState('cart', ['cart'])
    }
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
      },
      // 左侧按钮的点击事件处理函数
      onClick(e) {
        if (e.content.text === '购物车') {
          // 切换到购物车页面
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
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
.goods-nav {
  // 为商品导航组件添加固定定位
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.goods-detail{
  // 添加内边距，商品详细信息才能完全展示
  padding-bottom: 50px;
}
</style>
