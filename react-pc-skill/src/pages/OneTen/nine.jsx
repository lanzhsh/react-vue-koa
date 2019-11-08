import React from "react";

export default class Nine extends React.Component {
  static update(data) {
    console.log('静态方法调用执行啦')
  }
  render() {
    return (
      <div>
        这是 static 关键字技能
      </div>
    );
  }
}

Nine.update('2')
