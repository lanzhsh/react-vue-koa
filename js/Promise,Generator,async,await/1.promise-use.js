// 方法一:
new Promise((resolve,reject)=>{
  resolve('这是第一个 resolve 值')
}).then((data)=>{
  console.log(data) //会打印'这是第一个 resolve 值'
}).catch(()=>{

})

// 方法二:(静态方法)
Promise.resolve('这是第二个 resolve 值').then((data)=>{
  console.log(data) // 会打印'这是第二个 resolve 值'
})

Promise.reject('这是第二个 reject 值').then((data)=>{
  console.log(data)
}).catch(data=>{
  console.log(data) //这是第二个 reject 值
})

// 方法三(多个 Promise并行执行异步操作)
// 表示多个 Promise 都进入到 FulFilled 或者 Rejected 就会执行
const pOne = new Promise((resolve, reject) => {
  resolve(1);
});

const pTwo = new Promise((resolve, reject) => {
  resolve(2);
});

const pThree = new Promise((resolve, reject) => {
  resolve(3);
});

Promise.all([pOne, pTwo, pThree]).then(data => { 
  console.log(data); // [1, 2, 3] 正常执行完毕会执行这个,结果顺序和promise实例数组顺序是一致的
}, err => {
  console.log(err); // 任意一个报错信息
});

//方法四(多个中一个正常执行)
//表示多个 Promise 只有一个进入到 FulFilled 或者 Rejected 就会执行 

Promise.race([pOne, pTwo, pThree]).then(data => { 
  console.log(data); // 1 只要碰到FulFilled 或者 Rejected就会停止执行
}, err => {
  console.log(err); // 任意一个报错信息
});

// 方法五
// finally(ES2018 引入)方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
Promise.resolve('这是静态方法的第一个 resolve 值').finally(()=>{
  console.log('resolve 的finally')
})
Promise.reject('这是静态方法的第一个 reject 值').catch(err=>{
  console.log(err)
}).finally(()=>{
  console.log('reject 的finally')
})

// 方法六
// done 处于回调链的尾端，保证抛出任何可能出现的错误
Promise.prototype.done = function (onFulfilled, onRejected) {
    this
      .then(onFulfilled, onRejected)
      .catch(function (reason) {
        // 抛出一个全局错误
        setTimeout(() => {
          throw reason
        }, 0)
      })
  }
  Promise.resolve('这是静态方法的第一个 resolve 值').then(()=>{
    return '这是静态方法的第二个 resolve 值'
  }).then(()=>{
    throw ('这是静态方法的第一个 reject 值')
    return '这是静态方法的第二个 resolve 值'
  }).done()




