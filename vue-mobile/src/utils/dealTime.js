// /**
//  * 将Fri Mar 23 2018 12:19:48 GMT+0800 (国际时间)转化为dd-MM-yyyy HH:mm:ss
//  * @param {*} date:new Date 对象
//  */
// const dateToHH = date => {
//   date
//     .toLocaleString('en-US', {
//       hour12: false
//     })
//     .replace(/\b\d\b/g, '0$&')
//     .replace(new RegExp('/', 'gm'), '-')
// }

// /**
//  * 将yyyy-MM-dd转化为new Date()
//  * @param {*} date: yyyy-MM-dd
//  */
// const hHToDate = date => {
//   const dateArr = date.split(':')
//   return new Date(2017, 10, 19, dateArr[0], dateArr[1], dateArr[2])
// }

// /**
//  * 获取年份
//  */
// const getYear = () => {
//   return new Date().getFullYear()
// },

// /**
//  * 获取月份
//  */
// const getNowMonth = (fillFlag) => {
//   const mon=new Date().getMonth() + 1
//   let monRe=mon
//   if(fillFlag) mon<10?`0${mon}`:mon
//   return monRe
// },

// /**
//  * 获取当前时间
//  */
// const getTime = () => {
//   const date = new Date()
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hours = date.getHours()
//   const minu = date.getMinutes()
//   const second = date.getSeconds()
//   const arr = [month, day, hours, minu, second]
//   arr.forEach(item => {
//     item < 10 ? '0' + item : item
//   })
//   return (
//     year +
//     '-' +
//     arr[0] +
//     '-' +
//     arr[1] +
//     ' ' +
//     arr[2] +
//     ':' +
//     arr[3] +
//     ':' +
//     arr[4]
//   )
// }

// const returnTimestamp = strTime => {
//   const middleDate = new Date(Number(strTime))
//   return middleDate
//     .toLocaleString('zh-CN', {
//       hour12: false
//     })
//     .replace(/\b\d\b/g, '0$&')
//     .replace(new RegExp('/', 'gm'), '-')
// }
// const compareOneLessTwo = (dateOne, dateTwo) => {
//   return (
//     Number(dateOne.replace(/\-/g, '')) < Number(dateTwo.replace(/\-/g, ''))
//   )
// }

// export {
//   dateToHH,
//   hHToDate,
//   getTime,
//   getYear,
//   getNowMonth,
//   returnTimestamp,
//   compareOneLessTwo
// }
