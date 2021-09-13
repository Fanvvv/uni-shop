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
        total: 0
      };
    },
    onLoad(options) {
      // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      // 获取商品列表数据
      this.getGoodsList()
    },
    methods: {
      // 获取商品列表数据的方法
      async getGoodsList() {
        const { data } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        console.log(data)
        if (data.meta.status !== 200) return uni.$showMsg()
        this.goodsList = data.message.goods
        this.total = data.message.total
      }
    }
  }
</script>

<style lang="scss">

</style>
