/**
 * 判断两个对象是否相等
 * @param {Object} oneData  对象
 * @param {Object} twoData 对象
 */
export const isObjectEqual = (oneData, twoData) => {
  const twoFlag = JSON.stringify(oneData) === JSON.stringify(twoData)
  if (twoFlag) {
    return true
  } else {
    return false
  }
}
