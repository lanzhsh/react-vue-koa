import React from "react";
import { Button } from "antd";

export default class EightteenChildFour extends React.Component {
  state={
      name:'这是组件EightteenChildFour的name 值'
  }

  componentDidMount(){
    this.props.onRef(this)
    console.log(this) // ->将EightteenChildFour传递给this.props.onRef()方法
  }

  click = () => {
    this.setState({name:'这是组件click 方法改变EightteenChildFour改变的name 值'})
  };

  render() {
    return (
      <div>
        <div>{this.state.name}</div>
        <Button type="primary" onClick={this.click}>
          点击改变组件EightteenChildFour的name 值
        </Button>
      </div>
    );
  }
}

