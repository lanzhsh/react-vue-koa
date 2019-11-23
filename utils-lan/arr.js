
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
 * 数组排序
 * @param {Array} arr  数组
 * @param {Boolean} ascendFlag   升序
 */
export const orderAscendArr = (arr, ascendFlag) => {
  arr.sort((a, b) => {
    return ascendFlag ? a - b : b - a
  })
}

/**
 * 数组最大值
 * @param {Array} arr  数组
 */
export const maxArr = arr => {
  return Math.max(...arr)
}

/**
 * 数组求和
 * @param {Array} arr 数组
 */
export const sumArr = arr => {
  arr.reduce(function(prev, cur) {
    return prev + cur
  }, 0)
}

/**
 * 数组对象求和
 * @param {Object} arrObj 数组对象
 * @param {String} key 数组对应的 key 值
 */
export const arrObjSum = (obj, key) => {
  return arrObj.reduce((prev, cur) => prev + cur.key, 0)
}

/**
 * 数组合并
 * @param {Array} arrOne 数组
 * @param {Array} arrTwo 数组
 */
export const arrConcat = (arrOne, arrTwo) => {
  return [...arrOne, ...arrTwo]
}

/**
 * 数组是否包含某值
 * @param {Array} arr 数组
 * @param {} data 值
 */
export const arrIncludeValue = (arr, data) => {
  return arr.includes(data)
}

/**
 * 数组并集
 * @param {Array} arrOne
 * @param {Array} arrTwo
 */
export const arrAndSet = (arrOne, arrTwo) => {
  return arrOne.concat(arrTwo.filter(v => !arrOne.includes(v)))
}

/**
 * 数组并集
 * @param {Array} arrOne
 * @param {Array} arrTwo
 * eg: [1, 2, 3] [2, 4, 5] 差集为[1,3,4,5]
 */
export const arrIntersection = (arrOne, arrTwo) => {
  return arrOne.filter(v => arrTwo.includes(v))
}

/**
 * 数组差集
 * @param {Array} arrOne
 * @param {Array} arrTwo
 */
export const arrDifference = (arrOne, arrTwo) => {
  return arrOne.concat(arrTwo).filter(v => !arrOne.includes(v) || !arrTwo.includes(v))
}

/**
 * 两个数组合并成一个对象数组,考虑到复杂度,所以目前支持两个一维数组
 * @param {Array} arrOne
 * @param {Array} arrTwo
 * @param {oneKey} oneKey
 * @param {twoKey} twoKey
 */
export const arrTwoToArrObj = (arrOne, arrTwo, oneKey, twoKey) => {
  return arrOne.map((oneKey, i) => ({ oneKey, twoKey: arrTwo[i] }))
}
