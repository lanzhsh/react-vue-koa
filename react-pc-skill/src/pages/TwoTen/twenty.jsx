import React from "react";
import TwentyChild from "../../components/TwoTen/TwentyChild";

export default class Twenty extends React.Component {
  state = {
    val: "这是初始的 val"
  };
  render() {
    return (
      <div>
        <TwentyChild val={this.state.val} />
      </div>
    );
  }
}
