const bench = require('benchmark')

const suite = new bench.Suite()

function myFun() {
   let fol = 42; 
}

class myClass{
  constructor() {
    this.fol = 42; 
  }
}

suite
.add('function', () => {
  myFun()
})
.add('class', () => {
  new myClass()
})
.on('cycle', (evt) => {
  console.log(String(evt.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run()

// 结果
// node 版本v10.16.0
// node 版本v10.16.0
// function x 815,978,962 ops/sec ±1.53% (87 runs sampled)
// class x 812,855,174 ops/sec ±1.49% (88 runs sampled)
// Fastest is function,class
// 可以看出 class 和 function 速度差不多