import React from "react";

class Controll extends React.Component {
  constructor() {
    super();
    this.state = { value: "这是受控组件默认值" };
  }
  render() {
    return <div>{this.state.value}</div>;
  }
}

class NoControll extends React.Component {
  render() {
    return <div>{this.props.value}</div>;
  }
}

export default class Sixteen extends React.Component {
  componentDidMount() {
    console.log("ref 获取的不受控组件值为", this.refs["noControll"]);
  }
  render() {
    return (
      <div>
        <Controll></Controll>
        <NoControll
          value={"这是不受控组件传入值"}
          ref="noControll"
        ></NoControll>
      </div>
    );
  }
}
