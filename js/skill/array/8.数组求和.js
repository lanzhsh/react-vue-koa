// 普通数组
[1, 2, 3, 4].reduce(function (prev, cur) {
  return prev + cur;
}, 0) //10 

// 对象数组，age求和
const sum = [{age:1},{age:2}].reduce(function (prev, cur) {
  return prev + cur.age;
}, 0) //3
console.log(sum)