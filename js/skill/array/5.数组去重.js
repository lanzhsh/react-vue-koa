// 普通数组
console.log(Array.from(new Set([1, 2, 3, 3, 4, 4]))) //[1,2,3,4]
console.log([...new Set([1, 2, 3, 3, 4, 4])]) //[1,2,3,4]

// 对象数组
const arr = [{ name: 'name1', id: 1 }, { name: 'name2', id: 2 }, { name: 'name3', id: 3 }, { name: 'name1', id: 1 }, { name: 'name4', id: 4 }, { name: 'name5', id: 5 }];
const obj = [];
const result = arr.reduce(function (prev, cur, index, arr) {
  obj[cur.id] ? '' : obj[cur.id] = true && prev.push(cur);
  return prev;
}, []);
console.log(result) //[{ name: 'name1', id: 1 },{ name: 'name2', id: 2 },{ name: 'name3', id: 3 },{ name: 'name4', id: 4 },{ name: 'name5', id: 5 }]