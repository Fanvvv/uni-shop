<template>
  <view>
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
    <!-- 搜索建议列表页 -->
    <view class="sugg-list" v-if="searchResultList.length !== 0">
      <view class="sugg-item" v-for="(item, i) in searchResultList.goods" :key="i" @click="toDetail(item.goods_id)">
        <view class="goods-name">
          {{ item.goods_name }}
        </view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in historys" :key="i"></uni-tag>
      </view>
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
        searchResultList: [],
        // 搜索历史列表
        historyList: []
      };
    },
    onLoad() {
      // 加载本地存储的搜索历史记录
      this.historyList = JSON.parse(uni.getStorageSync('keyword') || [])
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
        // 查询到搜索后，将搜索关键字保存到搜索历史
        this.saveSearchHistory()
      },
      // 根据商品id跳转到商品详情页
      toDetail(id) {
        uni.navigateTo({
          url: '/subpkg/goods-detail/goods-detail?goods_id=' + id
        })
      },
      // 保存搜索关键词的方法
      saveSearchHistory() {
        // this.historyList.push(this.keyword)
        // 使用 Set 对象对数组进行去重
        // 将数组转化为 Set 对象
        const set = new Set(this.historyList)
        // 删除关键字
        set.delete(this.keyword)
        // 添加关键字
        set.add(this.keyword)
        // 将 Set 对象转化为数组
        this.historyList = Array.from(set)
        // 将搜索历史记录持久化存储到本地
        uni.setStorageSync('keyword', JSON.stringify(this.historyList))
      }
    },
    computed: {
      historys() {
        // 当列表改变时，反转数组，确保搜索历史记录的顺序
        return [...this.historyList].reverse()
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
.sugg-list {
  padding: 0 5px;
  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
.history-box {
  padding: 0 5px;
  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }
  .history-list {
    display: flex;
    flex-wrap: wrap;
    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>
