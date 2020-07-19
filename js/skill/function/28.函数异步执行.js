Promise.reject('这是第二个 reject 值').then((data) => {
  console.log(data)
}).catch(data => {
  console.log(data) //这是第二个 reject 值
})


function* gen(x) {
  const y = yield x + 6;
  return y;
}

// yield 如果用在另外一个表达式中,要放在()里面
// 像上面如果是在=右边就不用加()
function* genOne(x) {
  const y = `这是第一个 yield 执行:${yield x + 1}`;
  return y;
}

const g = gen(1);
//执行 Generator 会返回一个Object,而不是像普通函数返回return 后面的值
g.next() // { value: 7, done: false }
//调用指针的 next 方法,会从函数的头部或上一次停下来的地方开始执行，直到遇到下一个 yield 表达式或return语句暂停,也就是执行yield 这一行
// 执行完成会返回一个 Object,
// value 就是执行 yield 后面的值,done 表示函数是否执行完毕
g.next() // { value: undefined, done: true }
// 因为最后一行 return y 被执行完成,所以done 为 true


function getSomething() {
  return "something";
}
async function testAsync() {
  return Promise.resolve("hello async");
}
async function test() {
  const v1 = await getSomething();
  const v2 = await testAsync();
  console.log(v1, v2); //something 和 hello async
}
test();