const val = 1 + "";
console.log(val); // "1"
console.log(typeof val); // "string"

const val1 = String(1);
console.log(val1); // "1"
console.log(typeof val1); // "string"

const { info:{ dec} } = { name: '张三', age: 13, info:{dec: '描述1', info: '信息' }}
console.log(dec)


