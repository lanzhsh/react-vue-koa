
/**
 * 判断是否是数组
 * @param {Array}} arr 数组
 */
export const judgeArr = arr => {
  if (Array.isArray(arr)) {
    return true
  }
}

/**
 * 数组去重
 * @param {Array} arr  数组
 */
export const removeRepeatArr = arr => {
  return Array.from(new Set(arr))
}

/**
 * 数组升序
 * @param {Array} arr  数组
 */
export const orderAscendArr = arr => {
  arr.sort((a, b) => {
    return a - b
  })
}
