import React from "react";

export default class TwentyEight extends React.Component {
  state = {
    info: [
      { name: "曹操", age: 24 },
      { name: "关羽", age: 25 },
      { name: "张飞", age: 25 }
    ]
  };
  render() {
    const { info } = this.state;
    return (
      <div>
        {info.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div>{item.name}</div>
              <div>{item.age}</div>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}
