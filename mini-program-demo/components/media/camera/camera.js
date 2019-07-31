Component({
  properties: {
  },

  data: {

  },
  lifetimes: {
    attached() {
      this.ctx = wx.createCameraContext()
    }
  },
  methods: {
    takePhoto() {
      this.ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          this.setData({
            src: res.tempImagePath
          })
        }
      })
    },
    startRecord() {
      this.ctx.startRecord({
        success: (res) => {
          console.log('startRecord')
        }
      })
    },
    stopRecord() {
      this.ctx.stopRecord({
        success: (res) => {
          this.setData({
            src: res.tempThumbPath,
            videoSrc: res.tempVideoPath
          })
        }
      })
    },
    error(e) {
      console.log(e.detail)
    }
  }
})