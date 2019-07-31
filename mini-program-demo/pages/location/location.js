// pages/product/product.js
var base64 = require("../../images/base64");
var innerAudioContext;
Page({

  //页面初始数据
  data: {
    audioIsPlay: false,
    poster: 'http://pic.pimg.tw/pam86591/1408719752-3322564110_n.jpg',
    name: 'Sugar',
    author: 'Maroon 5',
    
  },

  //生命周期函数--监听页面加载

  onLoad: function (options) {
    this.setData({
      icon20: base64.icon20,
      icon60: base64.icon60
    });
  },

  //跳转详情
  toDetailOne() {
    wx.navigateTo({
      url: '/subs/shopDetail/pages/detailOne/detailOne'
    })
  }
})