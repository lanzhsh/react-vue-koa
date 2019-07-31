// pages/classify/classify.js
import { Storage} from '../../utils/util'

let sliderWidth = 96;
Page({

  data: {
    tabs: ["音频", "相机", "视频"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    showAuthFlag:false
  },
  onLoad: function () {
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  // 授权后拉取信息
  getUserInfo({ detail }) {
    console.log('授权后detail值为',detail);
  },
})