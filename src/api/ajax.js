import config from '../config'

function ajax ({url, method, data, header = {}}) {
  return new Promise((resolve, reject) => {
    Object.assign({
      'content-type': 'application/json' // 默认值
    }, header)
    wx.request({
      data,
      method,
      header,
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
