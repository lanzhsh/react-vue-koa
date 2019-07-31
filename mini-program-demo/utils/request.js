import { Storage, Loading, showToast } from './util'

/**
 * 网络请求
 * @param {Object} param
 * url: 请求url
 * method: 请求方法
 * data: 参数
 * header: 请求头
 * loading: 是否有loading
 * check: 是否校验登录信息
 * param: 剩余参数
 */

function request({
  url,
  method = 'POST',
  data = {},
  header,
  loading = true,
  check = true,
  toast = true,
  ...param
}) {
  const { token } = Storage.getSync('loginInfo') || {}
  // 校验token，递归等待登录接口回调
  if (check && !token) {
    return new Promise(resolve => {
      setTimeout(() => {
        request({ url, method, data, header, loading, check, toast, ...param }).then(res => {
          resolve(res)
        })
      }, 1000)
    })
  }

  return new Promise((resolve, reject) => {
    if (loading) Loading.show()

    wx.request({
      url,
      method,
      data,
      header: check ? {
        'i-token': token,
        ...header
      } : header,
      ...param,
      success: res => {
        const { statusCode, data, header } = res
        if (statusCode >= 200 && statusCode < 300) {
          resolve(data)

          const { code, msg } = data
          // 弹出错误提示
          if (code !== 0 && toast) showToast(msg)
        } else {
          reject(res)
        }
      },
      fail: err => {
        reject(err)
      },
      complete: () => {
        if (loading) Loading.hide()
      }
    })
  }).catch(err => {
    showToast(`请求异常，请稍后重试。${err.statusCode}`)
  })
}

export {
  request
}