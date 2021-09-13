<template>
  <view>
    <view class="goods-list">
      <block v-for="goods in goodsList" :key="goods.goods_id">
        <view class="goods-item">
          <view class="goods-item-left">
            <image :src="goods.goods_small_logo || defaultPic" mode="widthFix" class="goods-pic"></image>
          </view>
          <view class="goods-item-right">
            <view class="goods-name">
              {{ goods.goods_name }}
            </view>
            <view class="goods-info">
              <view class="goods-price">
                &yen;{{ goods.goods_price }}
              </view>
            </view>
          </view>
        </view>
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
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
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
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  &-left {
    margin-right: 5px;
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  &-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
    }
    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>
