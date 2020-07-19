// 普通数组
const arr1 =[1, 2, 3, 4].concat([5, 6]) //[1,2,3,4,5,6]
const arr2 =[...[1, 2, 3, 4],...[4, 5]] //[1,2,3,4,5,6]
const arrA = [1, 2], arrB = [3, 4]
const arr3 =Array.prototype.push.apply(arrA, arrB)//arrA值为[1,2,3,4]

// 对象数组合并
const arr4 = [{ age: 1 }].concat([{ age: 2 }])
const arr5 = [...[{ age: 1 }],...[{ age: 2 }]]
console.log(arr4)
console.log(arr5)
