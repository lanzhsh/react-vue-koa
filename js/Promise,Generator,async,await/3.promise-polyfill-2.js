// 完善 then
class MyPromise {
  constructor (handle) {
    // 判断handle函数与否
    if (typeof handle!=='function') {
      throw new Error('MyPromise must accept a function as a parameter')
    }

    // 添加状态
    this._status = 'PENDING'
    // 添加状态
    this._value = undefined
    // 添加成功回调函数队列
    this._fulfilledQueues = []
    // 添加失败回调函数队列
    this._rejectedQueues = []

    // 执行handle
    try {
      handle(this._resolve.bind(this), this._reject.bind(this)) 
    } catch (err) {
      this._reject(err)
    }
  }

  // 添加resovle时执行的函数
  _resolve (val) {
    if (this._status !== 'PENDING') return
    this._status = 'FULFILLED'
    this._value = val
  }

  // 添加reject时执行的函数
  _reject (err) { 
    if (this._status !== 'PENDING') return
    this._status = 'REJECTED'
    this._value = err
  }

  // 添加then方法
then (onFulfilled, onRejected) {
  const { _value, _status } = this
  // 返回一个新的Promise对象
  return new MyPromise((onFulfilledNext, onRejectedNext) => {
    // 封装一个成功时执行的函数
    let fulfilled = value => {
      try {
        if (typeof onFulfilled!=='function') {
          onFulfilledNext(value)
        } else {
          let res =  onFulfilled(value);
          if (res instanceof MyPromise) {
            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
            res.then(onFulfilledNext, onRejectedNext)
          } else {
            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
            onFulfilledNext(res)
          }
        }
      } catch (err) {
        // 如果函数执行出错，新的Promise对象的状态为失败
        onRejectedNext(err)
      }
    }
    // 封装一个失败时执行的函数
    let rejected = error => {
      try {
        if (typeof onRejected!=='function') {
          onRejectedNext(error)
        } else {
            let res = onRejected(error);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
        }
      } catch (err) {
        // 如果函数执行出错，新的Promise对象的状态为失败
        onRejectedNext(err)
      }
    }
    switch (_status) {
      // 当状态为pending时，将then方法回调函数加入执行队列等待执行
      case 'PENDING':
        this._fulfilledQueues.push(fulfilled)
        this._rejectedQueues.push(rejected)
        break
      // 当状态已经改变时，立即执行对应的回调函数
      case 'FULFILLED':
        fulfilled(_value)
        break
      case 'REJECTED':
        rejected(_value)
        break
    }
  })
}
}

// 测试用例
const obj=new MyPromise((resolve,reject)=>{
  resolve('这是第一个 resolve 值')
}).then((data)=>{
  console.log(data)
})
console.log(obj) //{ _status: 'FULFILLED', _value: '这是第一个 resolve 值' }