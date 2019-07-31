const getSystem = (function () {//获取设备信息
  let System;
  return function () {
    if (!System) {
      System = wx.getSystemInfoSync() //设备信息
      let system = System.system.toLowerCase(), //设备系统
        model = System.model.toLowerCase()
      system.indexOf('ios') > -1 ? System.isIOS = true : System.isIOS = false
      model == "iphone x" ? System.isIPhoneX = true : System.isIPhoneX = false
      console.log(System)
    }
    return System;
  }
})()

function callPhone(phoneNum) {//拨打手机号码
  wx.makePhoneCall({
    phoneNumber: phoneNum + ''
  })
}

const getNavigationBarHeight = (function(){//获取导航条高度，用于消息弹框
    let navigationBarHeight;
    return function(){
      if(!navigationBarHeight){
        let System = getSystem(),
            WXVersion = System.version,
            wxnavigationBarHeight = System.statusBarHeight,
            splitWXV = WXVersion.split("."),
            succWXVer = [splitWXV[0], splitWXV[1]].join(""); //微信版本是否大于6.6
            navigationBarHeight = succWXVer >= 66 ? wxnavigationBarHeight : 0;
      }
      return navigationBarHeight;
    }
})()

function topNavBarHeight(height){//消息弹框离顶部高度
  return getNavigationBarHeight() + (height || 40)
}



module.exports = {
  getSystem,
  callPhone,
  topNavBarHeight
}









