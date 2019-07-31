var innerAudioContext;
Component({
  /**
   * title [标题，默认 '']
   * back [返回按钮，默认 true]
   * home [显示主页入口，默认 false]
   */
  properties: {
    playFlag: {
      type: Boolean,
      value:false
  }
  },

  data: {

  },

  //组件生命周期声明对象，组件的生命周期：created、attached、ready、moved、detached将
  //收归到lifetimes字段内进行声明，原有声明方式仍旧有效，如同时存在两种声明方式，
  //则lifetimes字段内声明方式优先级最高
  //pageLifetimes:组件所在页面的生命周期声明对象，目前仅支持页面的show和hide两个生命周期
  lifetimes: {
    attached() {
      innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    }
  },

  methods: {
    //语音介绍
    playAudio() {
      console.log('innerAudioContext.paused值为', innerAudioContext.paused);
      innerAudioContext.play()
      this.setData({ playFlag: true })
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
      //播放错误
      innerAudioContext.onError((res) => {
        console.log('res值为', res);
      })
    },

    pauseAudio() {
      innerAudioContext.pause()
      this.setData({ playFlag: false })
      innerAudioContext.onPause(() => {
        console.log('暂停播放')
      })
    },
  }
})