import React from "react";

export default class Ten extends React.Component {
  constructor() { // class 的主函数
    super() // React.Component.prototype.constructor.call(this),其实就是拿到父类的属性和方法
    this.state = {
      arr:[]
    }
  }  
  render() {
    return (
      <div>
        这是技巧constructor和super的说明
      </div>
    );
  }
}
