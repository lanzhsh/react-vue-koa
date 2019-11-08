import React from "react";

// Function 方法定义
function FunCom(props){
    return <div>这是Function 定义的组件</div>
}

// createClass 定义在最新版本被移除,这里因为项目工程安装的是 16.x,所以不做演示
// const CreateClassCom = React.createClass({
//   render: function() {
//   return <div>这是React.createClass定义的组件</div>
//   }
// });

// component 定义组件
class Com extends React.Component {
  render(){
    return(<div>这是React.Component定义的组件</div>)
  }
}

export default class Seven extends React.Component {
  render() {
    return (
      <div>
        <FunCom></FunCom>
        <Com></Com>
      </div>
    );
  }
}
