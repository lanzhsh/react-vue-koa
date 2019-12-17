// 声明
function* gen(x){
  const y = yield x + 6;
  return y;
 }

// 执行
const g = gen(1);
console.log(g.next()) //{ value: 7, done: false }
// console.log(g.next()) //{ value: undefined, done: true }
console.log(g.next(2)) // { value: 2, done: true } 