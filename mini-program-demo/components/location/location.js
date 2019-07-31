const app = getApp();

Component({
  /**
   * content [内容]
   */
  properties: {
  },

  data: {
    latitude:'',
    longitude:'',
    speed:'',
    accuracy:''
  },

  lifetimes: {
    attached() {
      
    }
  },

  methods: {
    // 获取状态栏高度，用于设置 padding-top 值
    getLongitude(){
      let _this=this;
      wx.getLocation({
        type: 'wgs84',
        success (res) {
          _this.setData({
            latitude:res.latitude,
            longitude:res.longitude,
            speed:res.speed,
            accuracy:res.accuracy
          })
        }
      })
    }
  }
})