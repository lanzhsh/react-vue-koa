// 普通数组
[1, 2, 3].every(item => { return item > 2 })

// 数组对象
const arr = [{ age: 3 }, { age: 4 }, { age: 5 }]
arr.every(item => { return item.age > 2 })