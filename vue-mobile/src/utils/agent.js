/**
 * 判断是 Android 或 IOS
 */
export const checkAgent = () => {
  var u = navigator.userAgent
  var Agent = ''

  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // android终端或者uc浏览器
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isAndroid) {
    Agent = 'Android'
  } else if (isiOS) {
    Agent = 'IOS'
  }
  return Agent
}

/**
 * 检查是否是 IphoneX
 */
export const isIphoneX = () => {
  var u = navigator.userAgent
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isIOS && screen.height >= 812) {
    return true
  }
  return false
}
