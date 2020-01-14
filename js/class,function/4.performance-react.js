const React = require('react')
const ReactDOM = require('react-dom/server.node')
const bench = require('benchmark')

const suite = new bench.Suite()

function Func(){
  return React.createElement('span', {onClick: () => {console.log('click') }}, 'children')
}

class Cls extends React.Component{
  handleP() {
    console.log('click')
  }

  render(){
   return React.createElement('span', {onClick: this.handleP}, 'children')  
  }
}

suite
.add('function component', () => {
  ReactDOM.renderToString(React.createElement(Func))
})
.add('class component', () => {
  ReactDOM.renderToString(React.createElement(Cls))
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
// function component x 110,115 ops/sec ±13.91% (44 runs sampled)
// class component x 118,909 ops/sec ±12.71% (43 runs sampled)
// Fastest is class component,function component
// 可以看出在 React 中 function 和 class 性能基本差不多