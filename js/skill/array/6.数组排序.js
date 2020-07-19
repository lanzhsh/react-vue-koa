// 普通数组
console.log([1, 2, 3, 4].sort((a, b) => a - b)); // [1, 2,3,4],默认是升序
console.log([1, 2, 3, 4].sort((a, b) => b - a)); // [4,3,2,1],默认是升序

// 对象数组
const arr1 = [{ name: "Rom", age: 12 }, { name: "Bob", age: 22 }].sort((a, b) => { return a.age - b.age })//升序
const arr2 = [{ name: "Rom", age: 12 }, { name: "Bob", age: 22 }].sort((a, b) => { return -a.age + b.age })//降序
console.log(arr1) // [{ name: 'Bob', age: 22 }, { name: 'Rom', age: 12 }]
console.log(arr2) // [ { name: 'Rom', age: 12 }, { name: 'Bob', age: 22 } ]
