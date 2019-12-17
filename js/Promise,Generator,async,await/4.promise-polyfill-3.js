// 判断变量否为function
const isFunction = variable => typeof variable === 'function'
// 定义Promise的三种状态常量
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor (handle) {
    if (!isFunction(handle)) {
      throw new Error('MyPromise must accept a function as a parameter')
    }
    // 添加状态
    this._status = PENDING
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
    const run = () => {
      if (this._status !== PENDING) return
      this._status = FULFILLED
      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = (value) => {
        let cb;
        while (cb = this._fulfilledQueues.shift()) {
          cb(value)
        }
      }
      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (error) => {
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(error)
        }
      }
      /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
        当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
      */
      if (val instanceof MyPromise) {
        val.then(value => {
          this._value = value
          runFulfilled(value)
        }, err => {
          this._value = err
          runRejected(err)
        })
      } else {
        this._value = val
        runFulfilled(val)
      }
    }
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0)
  }
  // 添加reject时执行的函数
  _reject (err) { 
    if (this._status !== PENDING) return
    // 依次执行失败队列中的函数，并清空队列
    const run = () => {
      this._status = REJECTED
      this._value = err
      let cb;
      while (cb = this._rejectedQueues.shift()) {
        cb(err)
      }
    }
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0)
  }
  // 添加then方法
  then (onFulfilled, onRejected) {
    const { _value, _status } = this
    // 返回一个新的Promise对象
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 封装一个成功时执行的函数
      let fulfilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
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
          if (!isFunction(onRejected)) {
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
        case PENDING:
          this._fulfilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
          break
        // 当状态已经改变时，立即执行对应的回调函数
        case FULFILLED:
          fulfilled(_value)
          break
        case REJECTED:
          rejected(_value)
          break
      }
    })
  }
  // 添加catch方法
  catch (onRejected) {
    return this.then(undefined, onRejected)
  }
  // 添加静态resolve方法
  static resolve (value) {
    // 如果参数是MyPromise实例，直接返回这个实例
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }
  // 添加静态reject方法
  static reject (value) {
    if(value instanceof MyPromise) return value
    return new MyPromise((resolve ,reject) => reject(value))
  }
  // 添加静态all方法
  static all (list) {
    return new MyPromise((resolve, reject) => {
      /**
       * 返回值的集合
       */
      let values = []
      let count = 0
      for (let [i, p] of list.entries()) {
        // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
        this.resolve(p).then(res => {
          values[i] = res
          count++
          // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
          if (count === list.length) resolve(values)
        }, err => {
          // 有一个被rejected时返回的MyPromise状态就变成rejected
          reject(err)
        })
      }
    })
  }
  // 添加静态race方法
  static race (list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }
  finally (cb) {
    return this.then(
      value  => MyPromise.resolve(cb()).then(() => value),
      reason => MyPromise.resolve(cb()).then(() => { throw reason })
    );
  }
  done (onFulfilled, onRejected) {
    this.then(onFulfilled, onRejected)
      .catch((reason)=> {
        console.log('reason',reason)
      // 抛出一个全局错误
        throw(`错误为${reason}`)
    })
  }
}

// order 手动控制测试用例类型
const order=1
switch (order) {
  // 测试用例1:测试 resolve,then 和 catch
  case 1:
    new MyPromise((resolve,reject)=>{
      resolve('这是第一个 resolve 值')
    }).then((data)=>{
      console.log(data) //会打印'这是第一个 resolve 值'
      return '这是第二个 resolve 值'
    }).then(data=>{
      console.log(data)
      throw('这是reject 值')
    })
    .catch((err)=>{
      console.log(err)
    })
    break

  // 测试用例 2:测试静态方法resolve 和 reject
  case 2:
    MyPromise.resolve('这是静态方法的第一个 resolve 值').then((data)=>{
      console.log(data) // 会打印'这是静态方法的第一个 resolve 值'
    })
    MyPromise.reject('这是静态方法的第一个 reject 值').then((data)=>{
    }).catch(err=>{
      console.log(err) //会打印'这是静态方法的第一个 reject 值'
    })
    break

  // 测试用例 3:测试静态方法all,race
  case 3:
    const pOne = new MyPromise((resolve, reject) => {
      resolve(1);
    });
    
    const pTwo = new MyPromise((resolve, reject) => {
      resolve(2);
    });
    
    const pThree = new MyPromise((resolve, reject) => {
      resolve(3);
    });
    
    MyPromise.all([pOne, pTwo, pThree]).then(data => { 
      console.log(data); // [1, 2, 3] 正常执行完毕会执行这个,结果顺序和promise实例数组顺序是一致的
    }, err => {
      console.log(err); // 任意一个报错信息
    });
    
    MyPromise.race([pOne, pTwo, pThree]).then(data => { 
      console.log(data); // 1 正常执行完毕会执行这个,结果顺序和promise实例数组顺序是一致的
    }, err => {
      console.log(err); // 任意一个报错信息
    });
    break

  // 测试用例 4 finally 和 done
  case 4:
    MyPromise.resolve('这是静态方法的第一个 resolve 值').finally(()=>{
      console.log('resolve 的finally')
    })
    MyPromise.reject('这是静态方法的第一个 reject 值').catch(err=>{
      console.log(err)
    }).finally(()=>{
      console.log('reject 的finally')
    })
    MyPromise.resolve('这是静态方法的第一个 resolve 值').then(()=>{
      return '这是静态方法的第二个 resolve 值'
    }).then(()=>{
      throw('这是静态方法的第一个 reject 值')
      return '这是静态方法的第二个 resolve 值'
    }).done()
    break

  default:
    
    break
}




