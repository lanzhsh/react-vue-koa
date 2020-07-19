const { name, age, ...obj } = { name: '张三', age: 13, dec: '描述1', info: '信息' }
console.log(name)  // 张三
console.log(age)  // 13
console.log(obj)  // {dec: '描述1', info: '信息' }