import config from '../config'
// import qcloud from 'wafer2-client-sdk'

function ajax ({url, method, data, header = {}}, login = false) {
  return new Promise((resolve, reject) => {
    Object.assign({
      'content-type': 'application/json' // 默认值
    }, header)
    wx.request({
      data,
      method,
      header,
      login,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          wx.showModal({
            title: '失败',
            content: res.data.data.msg,
            showCancel: false
          })
          reject(res.data)
        }
      }
    })
  })
}
export default ajax
