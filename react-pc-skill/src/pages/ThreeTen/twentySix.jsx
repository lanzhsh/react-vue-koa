import React from "react";

export default class TwentySix extends React.Component {
  render() {
    return (
      <div>
        {React.createElement(
          "div",
          { id: "one", className: "two" },
          React.createElement("span", { id: "spanOne" }, "这是第一个 span 标签"),
          React.createElement("br"),
          React.createElement("span", { id: "spanTwo" }, "这是第二个 span 标签")
        )}
      </div>
    );
  }
}
