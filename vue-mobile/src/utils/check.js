
const judgeArr = arr => {
  if (Array.isArray(arr)) {
    return true
  }
}
const removeRepeatArr = arr => {
  return Array.from(new Set(arr))
}
const orderAscendArr = arr => {
  arr.sort((a, b) => {
    return a - b
  })
}
const allArrSatisfact = (arr, compare, value) => {
  return arr.every(arr => {
    return arr + compare + value
  })
}
const judgeNum = num => {
  if (typeof num1 === 'number') {
    return true
  } else {
    return false
  }
}
const judgeNumOrLetter = data => {
  const reg = /^[0-9a-zA-Z]*$/g
  if (reg.test(data)) {
    return true
  }
}
const trimLeftOrRight = str => {
  return str.replace(/(^s)|(s$)/g, '')
}
const isObjectEqual = (oneData, twoData) => {
  const twoFlag = JSON.stringify(oneData) === JSON.stringify(twoData)
  if (twoFlag) {
    return true
  } else {
    return false
  }
}
const checkAgent = () => {
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
export {
  judgeArr,
  removeRepeatArr,
  orderAscendArr,
  allArrSatisfact,
  judgeNum,
  judgeNumOrLetter,
  trimLeftOrRight,
  isObjectEqual,
  checkAgent
}
