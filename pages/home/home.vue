<template>
	<view>
		<!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="item in swiperList" :key="item.goods_id">
        <navigator class="swiper-item" :url="`/subpkg/goods-detail/goods-detail?goods_id=${item.goods_id}`">
          <image :src="item.image_src" mode=""></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航 -->
    <view class="nav-list">
      <view class="nav-list-item" v-for="(item, i) in navList" :key="i" @click="handleNavClick(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </div>
	</view>
  <!-- 楼层图片 -->
  <view class="floor-list">
    <!-- 楼层 item 项 -->
    <view class="floor-item" v-for="(item,i) in floorList" :key="i">
      <!-- 标题 -->
      <image :src="item.floor_title.image_src" class="floor-title"></image>
      <!-- 楼层图片区域 -->
      <view class="floor-img-box">
        <!-- 左边图片 -->
        <navigator class="img-box-left" :url="item.product_list[0].url">
          <image :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].image_width + 'rpx' }" mode="widthFix"></image>
        </navigator>
        <!-- 右边图片 -->
        <view class="img-box-right">
          <navigator class="right-item" v-for="(productItem, index) in item.product_list" :key="index" v-if="index !== 0" :url="productItem.url">
            <image :src="productItem.image_src" :style="{width: productItem.image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
        navList: [],
        floorList: []
			};
		},
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      async getSwiperList() {
        const { data } = await uni.$http.get('/api/public/v1/home/swiperdata')
        // console.log(data)
        if (data.meta.status !== 200) return uni.$showMsg()
        this.swiperList = data.message
      },
      async getNavList() {
        const { data } = await uni.$http.get('/api/public/v1/home/catitems')
        // console.log(data)
        if (data.meta.status !== 200) return uni.$showMsg()
        this.navList = data.message
      },
      async getFloorList() {
        const { data } = await uni.$http.get('/api/public/v1/home/floordata')
        // console.log(data)
        if (data.meta.status !== 200) return uni.$showMsg()
        // 处理跳转的传参
        data.message.forEach(floor => {
          floor.product_list.forEach(product => {
            product.url = '/subpkg/goods-list/goods-list?' + product.navigator_url.split('?')[1]
          })
        })
        this.floorList = data.message
      },
      handleNavClick(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      }
    }
	}
</script>

<style lang="scss">
swiper {
  height: 330rpx;
  .swiper-item, image {
    width: 100%;
    height: 100%;
  }
}
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}
.floor-title {
  display: flex;
  width: 100%;
  height: 60rpx;
}
.img-box-right {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.floor-img-box {
  display: flex;
  margin-top: 10rpx;
  padding-left: 10rpx;
}
</style>
