import React from "react";

// 属性代理
// const Seventeen = WraooedComponent =>
//   class extends React.Component {
//     render() {
//       const props = {
//         ...this.props,
//         name: "这是高阶组件"
//       };
//       return <WrappedComponent {...props} />;
//     }
//   };

// class WrappedComponent extends React.Component {
//     state={
//        baseName:'这是基础组件' 
//     }
//     render() {
//       const {baseName} = this.state
//       const {name} = this.props
//       return <div>
//           <div>基础组件值为{baseName}</div>
//           <div>通过高阶组件属性代理的得到的值为{name}</div>
//       </div>
//     }
//   }

// 反向继承
  const Seventeen = (WrappedComponent)=>{
    return class extends WrappedComponent {
        componentDidMount() {
            this.setState({baseName:'这是通过反向继承修改后的基础组件名称'})
        }
        render(){
            return super.render();
        }
    }
}

class WrappedComponent extends React.Component {
  state={
     baseName:'这是基础组件' 
  }
  render() {
    const {baseName} = this.state
    return <div>
        <div>基础组件值为{baseName}</div>
    </div>
  }
}

export default Seventeen(WrappedComponent);
