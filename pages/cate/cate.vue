<template>
	<view>
		<view class="scroll-view-container">
		  <scroll-view class="scroll-view-left" scroll-y="true" :style="{height: wh + 'px'}">
        <view class="scroll-left-item active">xxxxx</view>
        <view class="scroll-left-item">xxxxx</view>
        <view class="scroll-left-item">xxxxx</view>
        <view class="scroll-left-item">xxxxx</view>
        <view class="scroll-left-item">xxxxx</view>
        <view class="scroll-left-item">xxxxx</view>
      </scroll-view>
      <scroll-view class="scroll-view-right" scroll-y="true" :style="{height: wh + 'px'}">
        <view class="scroll-right-item">yyyyy</view>
        <view class="scroll-right-item">yyyyy</view>
        <view class="scroll-right-item">yyyyy</view>
        <view class="scroll-right-item">yyyyy</view>
        <view class="scroll-right-item">yyyyy</view>
        <view class="scroll-right-item">yyyyy</view>
      </scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
				wh: 0
			};
		},
    onLoad() {
      // 获取当前系统信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度动态赋值
      this.wh = sysInfo.windowHeight
    }
	}
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;
  .scroll-view-left {
    width: 120px;
    .scroll-left-item {
      line-height: 60px;
      text-align: center;
      font-size: 12px;
      background-color: #f7f7f7;
      &.active {
        background-color: #fff;
        position: relative;
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
