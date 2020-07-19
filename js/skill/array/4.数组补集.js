// 普通数组
// const arr1 = [1, 2, 3, 4, 5, 8, 9]
// const arr2 = [5, 6, 7, 8, 9];
// const difference = Array.from(new Set(arr1.concat(arr2).filter(v => !new Set(arr1).has(v) || !new Set(arr2).has(v)))) 
// console.log(difference) //[ 1, 2, 3, 4, 6, 7 ]

// 对象数组
let arr1 = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }];
let arr2 = [{ name: 'name1', id: 1 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }];
let arr3 = arr1.concat(arr2);
let result = arr3.filter(function (v) {
  return arr1.every(n => JSON.stringify(n) !== JSON.stringify(v)) || arr2.every(n => JSON.stringify(n) !== JSON.stringify(v))
})
console.log(result); // [{ name: 'name2', id: 2 },{ name: 'name3', id: 3 },{ name: 'name4', id: 4 },{ name: 'name5', id: 5 }]