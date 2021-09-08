import Vue from 'vue'
import App from './App'
import { $http } from '@escook/request-miniprogram'

// 将请求方法挂载到 uni 上
uni.$http = $http

// 请求地址
$http.baseUrl = 'https://www.uinav.com'

// 请求拦截器
$http.beforeRequest = function() {
  uni.showLoading({
    title: '数据加载中...'
  })
}

// 响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}

// 封装消息提示方法
uni.$showMsg = function(title = '请求数据失败！', duration = 1500) {
  return uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
