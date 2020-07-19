const param1 = 1;
const param2 = 2;
[param1, param2] = [param2, param1]; // 相当于交换了数组位置
console.log(param1) // 2
console.log(param2) // 1