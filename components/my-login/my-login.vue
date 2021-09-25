<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @tap="goLogin">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    methods: {
      ...mapMutations('user', ['updateUserInfo']),
      async getToken(info) {
        const [err, res] = await uni.login().catch(err => err)
        // console.log(err, res)
        if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        // 准备参数对象
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // 换取 token
        const { data } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        if (data.meta.status !== 200) return uni.$showMsg('登录失败！')
        uni.$showMsg('登录成功')
      },
      goLogin() {
        uni.getUserProfile({
            desc: '用于完善会员资料',  // 必填 声明获取用户个人信息后的用途，后续会展示在弹窗中
            lang: 'zh_CN',
            // 授权成功后的回调
            success: (user) => {
              this.getToken()
              this.updateUserInfo(user.userInfo)
            },
            // 授权失败后的回调
            fail(err) {
              // console.log(err)
              if (err.errMsg === "getUserProfile:fail auth deny") return uni.$showMsg('您取消了授权！')
            }
        })
      }
    }
  }
</script>

<style lang="scss">
.login-container {
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;
  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }
  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }
  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
