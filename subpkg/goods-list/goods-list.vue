<template>
  <view>
    <view class="goods-list">
      <block v-for="goods in goodsList" :key="goods.goods_id">
        <my-goods :goods="goods"></my-goods>
      </block>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          // 查询关键词
          query: '',
          // 分类ID
          cid: '',
          // 页数索引
          pagenum: 1,
          // 每页长度
          pagesize: 10
        },
        // 商品列表的数据
        goodsList: [],
        // 总数量，用来实现分页
        total: 0,
        // 节流阀
        isLoading: false
      };
    },
    onLoad(options) {
      // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      // 获取商品列表数据
      this.getGoodsList()
    },
    // 触底的事件
    onReachBottom() {
      // 判断是否加载完毕
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
      // 正在发送请求，则不再重复发送请求
      if (this.isLoading) return
      // 页面自增
      this.queryObj.pagenum += 1
      // 重新获取数据
      this.getGoodsList()
    },
    // 下拉刷新事件
    onPullDownRefresh() {
      // 重置关键数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []
      // 重新发送请求，并关闭刷新事件
      this.getGoodsList(() => uni.stopPullDownRefresh())
    },
    methods: {
      // 获取商品列表数据的方法
      async getGoodsList(cb) {
        // 正在请求数据
        this.isLoading = true
        const { data } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        console.log(data)
        // 数据请求完毕
        this.isLoading = false
        // 有关闭刷新事件则执行
        cb && cb()
        if (data.meta.status !== 200) return uni.$showMsg()
        // 新旧数据拼接
        this.goodsList = [...this.goodsList, ...data.message.goods]
        this.total = data.message.total
      }
    }
  }
</script>

<style lang="scss">

</style>
