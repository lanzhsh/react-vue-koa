/**
 * 节流
 * @param {*} func 执行函数
 * @param {*} delay 节流时间,毫秒
 */
export const throttle = function(func, delay) {
  let timer = null
  return function() {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, arguments)
        // 或者直接 func()
        timer = null
      }, delay)
    }
  }
}

/**
 * 防抖
 * @param {*} fn 执行函数
 * @param {*} wait 防抖时间,毫秒
 */
export const debounce = function(fn, wait) {
  let timeout = null
  return function() {
    if (timeout !== null) clearTimeout(timeout)// 如果多次触发将上次记录延迟清除掉
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
      // 或者直接 fn()
      timeout = null
    }, wait)
  }
}
