/**
 *  判断是否是数字
 * @param {Number} num
 */
export const judgeNum = num => {
  if (typeof num1 === 'number') {
    return true
  } else {
    return false
  }
}

/**
 * 判断是否是字母或数字
 * @param {Number || String} data  字符或数字
 */
export const judgeNumOrLetter = data => {
  const reg = /^[0-9a-zA-Z]*$/g
  if (reg.test(data)) {
    return true
  }
}

/**
 * 去掉字符左右空格
 * @param {String} str 字符
 */
export const trimLeftOrRight = str => {
  return str.replace(/(^s)|(s$)/g, '')
}

