//普通写法
// import React from 'react';
// class Home extends React.Component {
//   render() {
//   return (
//     <div>这是home页面</div>
//   )
//   }
// }

//hooks 写法

//hooks 解决的问题
//1.状态组件复用
//2.封装生命周期,让一个函数只做一件事
//3.this 问题

//mixins 和 hooks 的区别
//都是提供插拔式的功能注入
//minins是全局的,hooks 是局部的

import * as React from 'react';
import { useState ,useEffect} from 'react';
function Home(){
  //useState 是按照出现顺序取 key 值,所以不应该用 if 判断嵌套
  const [count, setCount] = useState(0);
  const [pageInfo]=useState({text:'这是 hone 页面'})

  function getLog(){
    console.log('componentDidMount 和 componentDidUpdate执行啦')
  }

  // useEffect相当于将componentDidMount 和 componentDidUpdate集成:
  //useEffect 的副作用函数是异步的,而componentDidMount 和 componentDidUpdate是同步
  useEffect(() => {
    getLog();
    //副作用函数在下次调用前执行 cleanup,避免造成内存泄漏
    return function cleanup() {
      getLog();
    };
  },[count]);
  //useEffect 第二个参数是数组,指定值变化才执行,类似 vue 的 watch 某个 state
  return(
    <div>{pageInfo.text}
    <p>点击 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击
    </button>
    </div>
  )
}

export default Home;
