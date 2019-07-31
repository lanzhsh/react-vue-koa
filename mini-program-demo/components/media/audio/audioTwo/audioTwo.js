Component({
  /**
   * content [内容]
   */
  properties: {
    
  },

  data: {
    
  },

  //组件生命周期声明对象，组件的生命周期：created、attached、ready、moved、detached将
  //收归到lifetimes字段内进行声明，原有声明方式仍旧有效，如同时存在两种声明方式，
  //则lifetimes字段内声明方式优先级最高
  //pageLifetimes:组件所在页面的生命周期声明对象，目前仅支持页面的show和hide两个生命周期
  lifetimes: {
    attached() {
       
    }
  },

  methods: {
    audioPlay: function () {
      this.setData({
        action: {
          method: 'play'
        }
      });
    },
    audioPause: function () {
      this.setData({
        action: {
          method: 'pause'
        }
      });
    },
    audioPlaybackRateSpeedUp: function () {
      this.setData({
        action: {
          method: 'setPlaybackRate',
          data: 2//加快速度
        }
      });
    },
    audio14: function () {
      this.setData({
        action: {
          method: 'setCurrentTime',
          data: 14
        }
      });
    },
    audioStart: function () {
      this.setData({
        action: {
          method: 'setCurrentTime',
          data: 0
        }
      });
    }
    
  }
})