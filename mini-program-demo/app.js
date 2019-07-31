import api from './utils/api'
import { Storage, showToast } from './utils/util'
import { request } from './utils/request'
App({
  onLaunch() {
    // 微信登录换取openId，存储用户信息
    wx.login({
      success: res => {
        request({
          url: api.login,
          data: {
            code: res.code,
            companyId: '502565183546195968'
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          check: false
        }).then(res => {
          if (res.code === 0 && res.data) {
            resolve(res.data)
            Storage.setSync('loginInfo', res.data)
          } else {
            showToast('登录异常，请稍后重试')
            console.log(`登录异常：${res.msg}`)
          }
        })
      }
    })

    // 获取系统信息
    this.globalData.systemInfo = wx.getSystemInfoSync()
  },

  globalData: {
    systemInfo: {}
  }
})