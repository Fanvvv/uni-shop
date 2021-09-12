<template>
	<view>
    <my-search @click="toSearch"></my-search>
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
      <scroll-view class="scroll-view-right" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view v-for="(subItem, index) in subCateList" :key="subItem.cat_id" class="cate-lv2">
          <view class="cate-lv2-title">
            {{ subItem.cat_name }}
          </view>
          <!-- 三级列表 -->
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="item in subItem.children" :key="item.cat_id" @click="toGoodsList(item.cat_id)">
              <!-- 图片 -->
              <!-- 后台接口问题，需要把9090端口替换为6005端口 -->
              <image :src="item.cat_icon.replace(/9090/, 6005)" mode="widthFix"></image>
              <!-- 文本 -->
              <text>{{ item.cat_name }}</text>
            </view>
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
        subCateList: [],
        // 滚动条距离页面顶部的位置
        scrollTop: 0
			};
		},
    onLoad() {
      // 获取当前系统信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度动态赋值
      // 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度(50)
      this.wh = sysInfo.windowHeight - 50
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
        // 让 scrollTop 的值在 0 与 1 之间切换
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      // 跳转到商品列表页
      toGoodsList(cid) {
        uni.navigateTo({
          url: '/subpkg/goods-list/goods-list?cid=' + cid
        })
      },
      // 跳转到搜索页
      toSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
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
.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;
  .cate-lv3-item {
    width: 33.33%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    image {
      width: 60px;
      height: 60px;
    }
    text {
      font-size: 12px;
    }
  }
}
</style>
