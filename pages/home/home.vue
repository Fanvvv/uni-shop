<template>
	<view>
		<!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="item in swiperList" :key="item.goods_id">
        <view class="swiper-item">
          <image :src="item.image_src" mode=""></image>
        </view>
      </swiper-item>
    </swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: []
			};
		},
    onLoad() {
      this.getSwiperList()
    },
    methods: {
      async getSwiperList() {
        const { data } = await uni.$http.get('/api/public/v1/home/swiperdata')
        console.log(data)
        if (data.meta.status !== 200) {
          return uni.showToast({
            title: '请求数据失败！',
            duration: 1500,
            icon: 'none'
          })
        }
        this.swiperList = data.message
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
</style>
