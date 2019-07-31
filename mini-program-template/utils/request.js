const app = getApp()

function request({
  url,
  method='post',
  data,
  header,
  ...param
}){
  return new Promise(function (resolve, reject) {
    wx.request({
      url,
      method,
      header: {
        FR_APPID: app.globalData.extAppid || '',
        FR_OPEN_ID: app.globalData.openid || ''
      },
      data,
      ...param,
      success(res) {
        resolve(res.data)
      },
      fail(loginData) {
        reject(res)
      }
    })
  })
}

export{
  request
}

//使用示例
//在min-demo/home/home.js文件里面有示例