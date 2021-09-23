<template>
  <view>
    <view class="goods-item">
      <view class="goods-item-left">
        <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="handleRadioClick"></radio>
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
      },
      // 是否展示图片左侧的 radio
      showRadio: {
        type: Boolean,
        // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
        default: false,
      }
    },
    methods: {
      handleRadioClick() {
        this.$emit('radioChange', {
          goods_id: this.goods.goods_id,
          // 商品最新的勾选状态
          goods_state: !this.goods.goods_state
        })
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
    display: flex;
    justify-content: space-between;
    align-items: center;
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
