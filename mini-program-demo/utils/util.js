/**
 * 显示消息提示框
 * @param {String} title 提示内容
 * @param {Object} param 可选
 */
function showToast(title, param) {
  wx.showToast({
    title,
    icon: 'none',
    mask: true,
    ...param
  })
}


/**
 * Loading 加载
 */
class Loading {
  static show(title = '加载中', param) {
    wx.showLoading({
      title,
      ...param
    })
  }

  static hide() {
    wx.hideLoading()
  }
}


/**
 * 显示模态弹窗
 * @param {Object} param
 * title: 标题
 * content: 提示内容
 * confirm: 确定回调
 * cancel: 取消回调
 * param: 剩余参数
 */
function showModal({ title = '提示', content, confirm, cancel, ...param }) {
  wx.showModal({
    title,
    content,
    success: res => {
      if (res.confirm) {
        if (confirm) confirm()
      } else if (res.cancel) {
        if (cancel) cancel()
      }
    },
    ...param
  })
}

class Storage {
  /**
   * 异步存储
   * @param {String} key key
   * @param {Object/String} data 存储的内容
   * @param {Object} param 可选
   */
  static set(key, data, param) {
    wx.setStorage({
      key,
      data,
      ...param
    })
  }

  /**
   * 同步存储
   * @param {String} key key
   * @param {Object/String} data 存储的内容
   */
  static setSync(key, data) {
    wx.setStorageSync(key, data)
  }

  /**
   * 异步获取
   * @param {Object} param
   * key: key
   * success: 成功回调
   * param: 剩余参数
   */
  static get({ key, success, ...param }) {
    wx.getStorage({
      key,
      success: res => {
        success(res.data)
      },
      ...param
    })
  }

  /**
   * 同步获取
   * @param {String} key key
   */
  static getSync(key) {
    return wx.getStorageSync(key)
  }
}


export {
  showToast,
  Loading,
  showModal,
  Storage
}