Component({
  properties: {

  },

  data: {

  },
  lifetimes: {
    attached() {

    }
  },
  methods: {
    beginRecord() {
      const recorderManager = wx.getRecorderManager()

      recorderManager.onStart(() => {
        console.log('recorder start')
      })
      recorderManager.onPause(() => {
        console.log('recorder pause')
      })
      recorderManager.onStop((res) => {
        console.log('recorder stop', res)
        const { tempFilePath } = res
      })
      recorderManager.onFrameRecorded((res) => {
        const { frameBuffer } = res
        console.log('frameBuffer.byteLength', frameBuffer.byteLength)
      })

      const options = {
        duration: 10000,
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192000,
        format: 'aac',
        frameSize: 50
      }

      recorderManager.start(options)
    }
  }
})