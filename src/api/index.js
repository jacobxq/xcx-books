import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import { showModal } from '@/util'

qcloud.setLoginUrl(config.loginUrl)

export function login (e) {
  return new Promise((resolve, reject) => {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        // 授权信息里有用户信息
        if (res.authSetting['scope.userInfo']) {
          // 检查用户登录是否过期
          const session = qcloud.Session.get()
          if (session) {
          // 第二次登录
          // 或者本地已经有登录态
          // 可使用本函数更新登录态
            qcloud.loginWithCode({
              success: res => {
                resolve(res)
              },
              fail: err => {
                reject(err)
              }
            })
          } else {
            // 首次登录
            qcloud.login({
              success: res => {
                resolve(res)
              },
              fail: err => {
                reject(err)
              }
            })
          }
        } else {
          showModal('用户未授权', e.mp.detail.errMsg)
        }
      }
    })
  })
}

export default {
  login
}
