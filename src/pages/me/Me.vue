<template>
  <div class="container">
    <div class="userinfo">
      <img :src="userinfo.avatarUrl" alt="">
      <p>{{userinfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button v-if='userinfo.openId' @click='scanBook' class='btn'>添加图书</button>
    <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button></div>
</template>
<script>
import YearProgress from '@/components/YearProgress'
import { showSuccess, showModal } from '@/util'
import { login, addBook } from '@/api'
export default {
  data () {
    return {
      userinfo: {
        avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
        nickName: ''
      }
    }
  },
  components: {
    YearProgress
  },
  methods: {
    async addBook (isbn) {
      const res = await addBook('/weapp/addbook', {
        isbn,
        openid: this.userinfo.openId
      })
      if (res.title) showModal('添加成功', `${res.title}添加成功`)
    },
    scanBook () {
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
        }
      })
    },
    async login (e) {
      try {
        let res = await login(e)
        console.log(res)
        this.userinfo = res
        wx.setStorageSync('userinfo', res)
        showSuccess('登录成功')
      } catch (err) {
        console.error(err)
        showModal('登录错误', err.message)
      }
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

<style lang="scss">
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