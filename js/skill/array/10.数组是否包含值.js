// 普通数组
console.log([1, 2, 3].includes(4)) //false
console.log([1, 2, 3].indexOf(4)) //-1 如果存在换回索引
console.log([1, 2, 3].find((item) => item === 3)) //3 如果数组中无值返回undefined
console.log([1, 2, 3].findIndex((item) => item === 3)) //2 如果数组中无值返回-1

// 数组对象
const flag = [{age:1},{age:2}].some(v=>JSON.stringify(v)===JSON.stringify({age:2}))
console.log(flag)