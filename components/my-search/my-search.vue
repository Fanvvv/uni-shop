<template>
  <view class="search-container">
    <view class="search-box">
      <uni-icons type="search" size="17"></uni-icons>
      <text>搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search"
  }
</script>

<style lang="scss">
.search-container {
  background-color: #c00000;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  .search-box {
    height: 36px;
    background-color: #ffffff;
    border-radius: 15px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text {
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>
