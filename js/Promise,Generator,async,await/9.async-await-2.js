// async 作用
async function testAsync() {
  return "hello async";
}

const result = testAsync();
console.log(result); //Promise 对象

testAsync().then(v => {
  console.log(v);    // 输出 hello async
});

// await后面可以是Promise对象或其他表达式
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

// 处理异常 try...catch...