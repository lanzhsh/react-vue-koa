/**
 * 获取年份
 */
export const getYear = () => {
  return new Date().getFullYear()
}

/**
 * 获取月份,会补 0
 * @param {Boolean} fillFlag 布尔值,是否补 0
 */
export const getMonth = (fillFlag) => {
  const mon = new Date().getMonth() + 1
  const monRe = mon
  if (fillFlag) mon < 10 ? `0${mon}` : mon
  return monRe
}

/**
 * 获取日
 * @param {Boolean} fillFlag 布尔值,是否补 0
 */
export const getDay = (fillFlag) => {
  const day = new Date().getDate()
  const dayRe = day
  if (fillFlag) day < 10 ? `0${day}` : day
  return dayRe
}

/**
 * 获取当前月天数
 * @param {String} year 年份
 * @param {String} month 月份
 */
export const getMonthNum = (year, month) => {
  var d = new Date(year, month, 0)
  return d.getDate()
}

/**
 * 获取星期几
 */
export const getWhatDay = () => {
  return new Date().getDay() ? new Date().getDay() : 7
}

/**
 * 获取当前时间 yyyy-mm-dd,hh:mm:ss
 */
export const getYyMmDdHhMmSs = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minu = date.getMinutes()
  const second = date.getSeconds()
  const arr = [month, day, hours, minu, second]
  arr.forEach(item => {
    item < 10 ? '0' + item : item
  })
  return (
    year +
    '-' +
    arr[0] +
    '-' +
    arr[1] +
    ' ' +
    arr[2] +
    ':' +
    arr[3] +
    ':' +
    arr[4]
  )
}

/**
 * 时间戳转化为年月日
 * @param ymd 格式类型(yyyy-mm-dd,yyyy/mm/dd)
 * @param times 时间戳
 * @param hms 可选,格式类型(hh,hh:mm,hh:mm:ss)
 * @returns {年月日}
 */
export const timesToYyMmDd = (ymd, times, hms) => {
  const oDate = new Date(times)
  const oYear = oDate.getFullYear()
  const oMonth = oDate.getMonth() + 1
  const oDay = oDate.getDate()
  const oHour = oDate.getHours()
  const oMin = oDate.getMinutes()
  const oSec = oDate.getSeconds()
  let oTime // 最后拼接时间
  // 年月日格式
  switch (ymd) {
    case 'yyyy-mm-dd':
      oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay)
      break
    case 'yyyy/mm/dd':
      oTime = oYear + '/' + getzf(oMonth) + '/' + getzf(oDay)
      break
  }
  // 时分秒格式
  switch (hms) {
    case 'hh':
      oTime = oTime + getzf(oHour)
      break
    case 'hh:mm':
      oTime = oTime + getzf(oHour) + ':' + getzf(oMin)
      break
    case 'hh:mm:ss':
      oTime = oTime + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSec)
      break
  }
  return oTime
}

/**
 * 将年月日转化成时间戳
 * @param {String} time yyyy/mm/dd 或yyyy-mm-dd 或yyyy-mm-dd hh:mm 或yyyy-mm-dd hh:mm:ss
 */
export const YyMmDdToTimes = (time) => {
  return new Date(time.replace(/-/g, '/')).getTime()
}

/**
 *  比较时间 1 小于时间 2
 * @param {String} timeOne  时间 1
 * @param {String} timeTwo  时间 2
 */
export const compareOneLessTwo = (timeOne, timeTwo) => {
  return (
    Number(timeOne.replace(/\-/g, '')) < Number(timeTwo.replace(/\-/g, ''))
  )
}
