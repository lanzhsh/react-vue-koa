import React from "react";

export default class One extends React.Component {
  state = {
    flag: true,
    flagOne: 1
  };
  render() {
    return (
      <div>
        {this.state.flag ? <div>显示内容</div> : ""}
        {this.state.flagOne ? <div>显示内容1</div> : ""}
      </div>
    );
  }
}
