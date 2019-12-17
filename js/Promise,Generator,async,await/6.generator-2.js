// 嵌套

function* gen(x){
  const y = yield x + 6;
  return y;
 }

 function* genOne(x){
  const y = `这是第一个 yield 执行:${yield x + 1}`;
 return y;
}

function* genTwo(x){
  yield* gen(1)
  yield* genOne(1)
  const y = `这是第 二个 yield 执行:${yield x + 2}`;
  return y;
 }
 const iterator=genTwo(1)
 // 因为 Generator 函数运行时生成的是一个 Iterator 对象，所以可以直接使用 for...of 循环遍历
 for(let value of iterator) {
    console.log(value) // 7 2 3
  }