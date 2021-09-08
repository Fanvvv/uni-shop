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
        // console.log(data)
        if (data.meta.status !== 200) return uni.$showMsg()
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
