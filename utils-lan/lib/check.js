/**
 *  判断是否是数字
 * @param {Number} data
 */
export const checkNum = data => {
  const reg = /^\d{1,}$/g
  if (reg.test(data)) return true
}

/**
 *  判断是否是字母
 * @param {Number} data
 */
export const checkLetter = data => {
  const reg = /^[a-zA-Z]+$/g
  if (reg.test(data)) return true
}

/**
 *  判断是否全部是小写字母
 * @param {Number} data
 */
export const checkLowercaseLetter = data => {
  const reg = /^[a-z]+$/g
  if (reg.test(data)) return true
}

/**
 *  判断是否是大写字母
 * @param {Number} data
 */
export const checkCapitalLetter = data => {
  const reg = /^[A-Z]+$/g
  if (reg.test(data)) return true
}

/**
 * 判断是否是字母或数字
 * @param {Number || String} data  字符或数字
 */
export const checkNumOrLetter = data => {
  const reg = /^[0-9a-zA-Z]*$/g
  if (reg.test(data)) return true
}

/**
 * 判断是否是中文
 * @param {String} data  中文
 */
export const checkChinese = data => {
  const reg = /^[\u4E00-\u9FA5]+$/g
  if (reg.test(data)) return true
}

/**
 * 判断是否是中文，数字或字母
 * @param {String} data  中文，数字或字母
 */
export const checkChineseNumberLettter = data => {
  const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/g
  if (reg.test(data)) return true
}

/**
 * 判断是否是邮箱地址
 * @param {String} data
 */
export const checkEmail = data => {
  const reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g
  if (reg.test(data)) return true
}

/**
 * 判断是否是手机号，只要是13,14,15,16,17,18,19开头即可
 * @param {String} data
 */
export const checkTelphone = data => {
  const reg = /^((\+|00)86)?1[3-9]\d{9}$/g
  if (reg.test(data)) return true
}

/**
 * 判断是否是正确的网址
 * @param {String} url 网址
 */
export const checkUrl = url => {
  const a = document.createElement('a')
  a.href = url
  return [
    /^(http|https):$/.test(a.protocol),
    a.host,
    a.pathname !== url,
    a.pathname !== `/${url}`
  ].find(x => !x) === undefined
}

