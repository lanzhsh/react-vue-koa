import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";

export default class EightteenChildOne extends React.Component {
  static propTypes = { //
    name: PropTypes.string
  };

  click = () => {
    this.props.eightteenChildOneToFather("这是 props 改变父元素的值");
  };

  render() {
    return (
      <div>
        <div>这是通过 props 传入的值{this.props.name}</div>
        <Button type="primary" onClick={this.click}>
          点击改变父元素值
        </Button>
      </div>
    );
  }
}
