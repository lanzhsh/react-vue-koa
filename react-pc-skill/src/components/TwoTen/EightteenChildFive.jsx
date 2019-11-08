import React from "react";
import { Button } from "antd";

export default class EightteenChildFive extends React.Component {
  state={
      name:'这是组件EightteenChildFive的name 值'
  }

  click = () => {
    this.setState({name:'这是组件click 方法改变EightteenChildFive改变的name 值'})
  };

  render() {
    return (
      <div>
        <div>{this.state.name}</div>
        <Button type="primary" onClick={this.click}>
          点击改变组件EightteenChildFive的name 值
        </Button>
      </div>
    );
  }
}

