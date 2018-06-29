<template>
  <div class="container">
    <div class="userinfo">
      <img :src="userinfo.avatarUrl" alt="">
      <p>{{userinfo.nickName}}</p>
    </div>
    <!-- <YearProgress></YearProgress> -->
    <!-- <button v-if='userinfo.openId' @click='scanBook' class='btn'>添加图书</button> -->
    <button v-if='userinfo.openId' class='btn'>添加图书</button>
    <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button></div>
</template>
<script>
import qcloud from 'wafer2-client-sdk'
// import YearProgress from '@/components/YearProgress'
import {
  showSuccess,
  showModal
} from '@/util'
import config from '@/config'
export default {
  data () {
    return {
      userinfo: {
        avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
        nickName: ''
      }
    }
  },
  methods: {
    // async addBook(isbn) {
    //   const res = await post('/weapp/addbook', {
    //     isbn,
    //     openid: this.userinfo.openId
    //   })
    //   showModal('添加成功', `$ {
    //     res.title
    //   }添加成功`)
    // },
    // scanBook() {
    //   wx.scanCode({
    //     success: (res) => {
    //       if (res.result) {
    //         this.addBook(res.result)
    //       }
    //     }
    //   })
    // },
    login (e) {
      const self = this
      // 查看是否授权
      wx.getSetting({
        success: function (res) {
          // 授权信息里有用户信息
          if (res.authSetting['scope.userInfo']) {
            // 检查用户登录是否过期
            const session = qcloud.Session.get()
            qcloud.setLoginUrl(config.loginUrl)
            if (session) {
            // 第二次登录
            // 或者本地已经有登录态
            // 可使用本函数更新登录态
              qcloud.loginWithCode({
                success: res => {
                  self.userinfo = res
                  wx.setStorageSync('userinfo', res)
                  showSuccess('登录成功')
                },
                fail: err => {
                  console.error(err)
                  showModal('登录错误', err.message)
                }
              })
            } else {
              // 首次登录
              qcloud.login({
                success: res => {
                  self.userinfo = res
                  wx.setStorageSync('userinfo', res)
                  showSuccess('登录成功')
                },
                fail: err => {
                  console.error(err)
                  showModal('登录错误', err.message)
                }
              })
            }
          } else {
            showModal('用户未授权', e.mp.detail.errMsg)
          }
        }
      })
    }
  },
  onShow () {
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
}
</script>

<style>
.container{
  padding:0 30rpx;
}  
.userinfo{
  margin-top:100rpx;
  text-align:center;
}

img{
  width: 150rpx;
  height:150rpx;
  margin: 20rpx;
  border-radius: 50%;
}
</style>