import React, { Component } from "react";
import {Button} from "antd"

class Parent extends Component {
  constructor() {
    super();
    this.state = {
      count: 1
    };
  }
  getChildren() {
    const _this = this;
    let { children } = _this.props;
    return React.Children.map(children, child => {
      return React.cloneElement(child, {
        count: _this.state.count
      });
    });
  }
  handleClick() {
    this.setState({
      count: this.state.count+1
    });
  }
  render() {
    return (
      <div>
        <Button onClick={this.handleClick.bind(this)}>点击增加次数</Button>
        {this.getChildren()}
      </div>
    );
  }
}
class Child extends Component {
  render() {
    return <div>这是子组件：{this.props.count}</div>;
  }
}
export default class Test extends Component {
  render() {
    return (
      <Parent>
        <Child />
      </Parent>
    );
  }
}
