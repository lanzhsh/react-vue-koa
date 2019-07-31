import { jt_getSystem } from '../../../../utils/jt_c_utils'

Page({
  data: {
    url:''
  },

  onLoad(options) {
    let url;
    if (jt_getSystem().isIOS) { //ios
      // url='https://itunes.apple.com/cn/app/id1425709969?mt=8';
      url='https://www.pgyer.com/VTGH';
    } else { //安卓
      url='https://superip.aiplussales.cn/download/superip.apk';
    }
    console.log('url值为',url);
    this.setData({
      url:url
    })
  }
})