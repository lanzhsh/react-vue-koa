import { getUserInfo } from '../../utils/common'

Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  lifetimes: {
    attached() {
      this.getScope()
    }
  },

  methods: {
    // 检测是否授权用户信息
    getScope() {
      wx.getSetting({
        success: res => {
          this.setData({
            show: res.authSetting['scope.userInfo'] ? false : true
          })
        }
      })
    },

    getUserInfo(e) {
      getUserInfo(e).then(res => {
        if (res) {
          this.setData({ show: false })
          this.triggerEvent('getUserInfo', res)
        }
      })
    }
  }
})
