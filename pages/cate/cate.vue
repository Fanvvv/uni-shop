<template>
	<view>
		<view class="scroll-view-container">
		  <scroll-view class="scroll-view-left" scroll-y="true" :style="{height: wh + 'px'}">
        <view
         v-for="(item, index) in cateList"
         :key="item.cat_id"
         :class="['scroll-left-item', index === activeIndex ? 'active' : '']"
         @click="changeActive(index)"
         >
          {{ item.cat_name }}
         </view>
      </scroll-view>
      <scroll-view class="scroll-view-right" scroll-y="true" :style="{height: wh + 'px'}">
        <view v-for="(subItem, index) in subCateList" :key="subItem.cat_id" class="cate-lv2">
          <view class="cate-lv2-title">
            {{ subItem.cat_name }}
          </view>
        </view>
      </scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
				wh: 0,
        cateList: [],
        // 默认选择第一项
        activeIndex: 0,
        // 二级分类列表
        subCateList: []
			};
		},
    onLoad() {
      // 获取当前系统信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度动态赋值
      this.wh = sysInfo.windowHeight
      // 发送请求获取数据
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const { data } = await uni.$http.get('/api/public/v1/categories')
        console.log(data)
        if (data.meta.status !== 200) return uni.$showMsg()
        this.cateList = data.message
        // 赋值二级分类列表
        this.subCateList = data.message[0].children
      },
      // 选中项触发事件
      changeActive(index) {
        this.activeIndex = index
        // 修改二级分类列表的数据
        this.subCateList = this.cateList[index].children
      }
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
.cate-lv2-title {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}
</style>
