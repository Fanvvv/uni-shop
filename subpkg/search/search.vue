<template>
  <view>
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 定时器
        timer: null,
        // 搜索的关键词
        keyword: '',
        // 搜索结果列表
        searchResultList: []
      };
    },
    methods: {
      input(e) {
        // 清除定时器
        clearTimeout(this.timer)
        // 创建一个新的延时器，500ms没有更改时触发
        this.timer = setTimeout(() => {
          this.keyword = e
          // console.log(this.keyword)
          // 获取搜索结果
          this.getSearchList()
        }, 500)
      },
      // 获取搜索结果
      async getSearchList() {
        if (!this.keyword) {
          this.searchResultList = []
          return
        }
        const { data } = await uni.$http.get('/api/public/v1/goods/search', { query: this.keyword })
        // console.log(data)
        if (data.meta.status !== 200) return uni.$showMsg()
        this.searchResultList = data.message
      }
    }
  }
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
