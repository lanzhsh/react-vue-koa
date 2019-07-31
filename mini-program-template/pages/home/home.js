// pages/home/home.js
// import {request} from '../../utils/request';
//获取应用实例
const app = getApp();
Page({

  //页面初始数据
  data: {
    homeVal:''
  },

  //生命周期函数--监听页面加载

  onLoad: function (options) {
    // request.$api.get('url','').then(res=>{
    //   console.log(res);
    // }).catch(res=>{
    //   console.log(res);
    // })
  },

  //生命周期函数--监听页面初次渲染完成
  onReady: function () {

  },

  //用户点击右上角分享
  onShareAppMessage: function () {
    return {
 
      title: '自定义分享标题',
 
      desc: '自定义分享描述',
 
      path: '/pages/home/home'
 
    }
  },

  //子组件传入父组件值
  toHomeVal:function(e){
    this.setData({
      homeVal:e.detail.key
    })
  },

  //获取用户信息
  toAuth:function(){
    wx.navigateTo({
      url:'/subs/auth/pages/auth/auth'
    })
  },

  //跳转下载
  toDownLoad(){
    wx.navigateTo({
      url:'/subs/links/pages/downlaod/downlaod'
    })
  }
})