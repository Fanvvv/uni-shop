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
  import { mapMutations, mapState } from 'vuex'
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState('user', ['redirectInfo'])
    },
    methods: {
      ...mapMutations('user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      async getToken(info) {
        console.log(info)
        const [err, res] = await uni.login().catch(err => err)
        // console.log(err, res)
        if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
        // 准备参数对象
        // const query = {
        //   code: res.code,
        //   encryptedData: info.encryptedData,
        //   iv: info.iv,
        //   rawData: info.rawData,
        //   signature: info.signature
        // }
        // console.log(query)
        // // 换取 token
        // const { data } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        // console.log(data)
        // if (data.meta.status !== 200) return uni.$showMsg('登录失败！')
        uni.$showMsg('登录成功')
        // 登录成功后设置 token
        // 接口错误，自己定义一个 token
        const token = "BearereyJhbGci0iJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQi0jEyLCJpYXQi0jE1MjUNDIyNjMsImV4cCI6WTUyNTQ40DYyW30.g-4GtEQNPwT_XsBPq7Lrco_9DfHQQsBiOKZerkO-O-o"
        this.updateToken(token)
        // 跳回之前的页面
        this.navigateBack()
      },
      goLogin() {
        uni.getUserProfile({
            desc: '用于完善会员资料',  // 必填 声明获取用户个人信息后的用途，后续会展示在弹窗中
            lang: 'zh_CN',
            // 授权成功后的回调
            success: (user) => {
              this.getToken(user)
              this.updateUserInfo(user.userInfo)
            },
            // 授权失败后的回调
            fail(err) {
              // console.log(err)
              if (err.errMsg === "getUserProfile:fail auth deny") return uni.$showMsg('您取消了授权！')
            }
        })
      },
      // 登录成功后，返回之前的页面
      navigateBack() {
        console.log(this.redirectInfo)
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          // 调用小程序提供的 uni.switchTab() API 进行页面的导航
          uni.switchTab({
            // 要导航到的页面地址
            url: this.redirectInfo.from,
            // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
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
