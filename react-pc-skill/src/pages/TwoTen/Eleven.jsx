import React from "react";
import PropTypes from "prop-types";

class PropTypeOne extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.email}</div>
        <div>{this.props.name}</div>
      </div>
    );
  }
}

PropTypeOne.propTypes = {
  name: PropTypes.string, //值可为array,bool,func,number,object,symbol
  email: function(props, propName, componentName) {
    //自定义校验
    if (
      !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(
        props[propName]
      )
    ) {
      return new Error(
        "组件" + componentName + "里的属性" + propName + "不符合邮箱的格式"
      );
    }
  }
};

class PropTypeTwo extends React.Component {
  static propTypes = {
      name:PropTypes.string
  };
  render() {
    return (
      <div>
        <div>{this.props.name}</div>
      </div>
    );
  }
}

export default class Eleven extends React.Component {
  render() {
    return (
      <div>
        <PropTypeOne email={"123456@qq.com"} name={"关羽"}></PropTypeOne>
        <PropTypeTwo name={"关羽"}></PropTypeTwo>
      </div>
    );
  }
}
