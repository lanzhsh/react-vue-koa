import React from "react";

export default class Thirty extends React.Component {
  click = e => {
    console.log(e.target.getAttribute("data-row"));
  };

  render() {
    return (
      <div>
        <div data-row={"属性1"} data-col={"属性 2"} onClick={this.click}>
          点击获取属性
        </div>
      </div>
    );
  }
}
