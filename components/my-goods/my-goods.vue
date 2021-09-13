<template>
  <view>
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
            &yen;{{ goods.goods_price | toFixed }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    props: {
      goods: {
        type: Object,
        default: () => ({})
      }
    },
    filters: {
      toFixed(num) {
        // 把数字处理为带两位小数点的数字
        return Number(num).toFixed(2)
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
