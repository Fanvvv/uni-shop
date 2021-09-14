<template>
	<view>
		Cart
	</view>
</template>

<script>
  import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
    computed: {
      ...mapGetters('cart', ['total'])
    },
    onShow() {
      // 页面显示的时候加载
      this.setBadge()
    },
    methods: {
      setBadge() {
        // 设置购物车右上角的徽标
        uni.setTabBarBadge({
          index: 2,
          text: this.total + '' // 这里是加上字符串
        })
      }
    }
	}
</script>

<style lang="scss">

</style>