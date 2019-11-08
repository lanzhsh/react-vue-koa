import React from "react";
import { Button } from 'antd'

export default class Twelve extends React.Component {
  state = { value: 0 };

  handleIncrement = () => {
    this.setState(prevState => ({
      value: prevState.value + 1
    }));
  };

  handleDecrement = () => {
    this.setState(prevState => ({
      value: prevState.value - 1
    }));
  };

  render() {
    return (
      <div>
        {this.state.value}

        <Button type="primary" onClick={this.handleIncrement}>+</Button>
        <Button type="primary" onClick={this.handleDecrement}>-</Button>
      </div>
    );
  }
}
