const app = getApp()

Component({
  /**
   * title [标题，默认 '']
   * back [返回按钮，默认 true]
   * home [显示主页入口，默认 false]
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    back: {
      type: Boolean,
      value: true
    },
    home: {
      type: Boolean,
      value: false
    }
  },

  data: {
    statusBarHeight: ''
  },

  lifetimes: {
    attached() {
      this._setStatusBarHeight()
    }
  },

  methods: {
    // 获取状态栏高度，用于设置 padding-top 值
    _setStatusBarHeight() {
      const { statusBarHeight } = app.globalData.systemInfo
      this.setData({ statusBarHeight })
    },

    // 返回
    _goBack() {
      wx.navigateBack()
    },

    // 清除页面栈，回到个人中心首页
    _goHome() {
      wx.reLaunch({
        url: '/pages/location/location'
      })
    }
  }
})
