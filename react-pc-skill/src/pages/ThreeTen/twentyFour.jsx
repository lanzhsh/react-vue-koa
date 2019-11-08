import React from "react";
import ReactDOM from "react-dom";
import {Button} from "antd"

const modalRoot = document.body;

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.el.style.width = "200px";
    this.el.style.height = "200px";
    this.el.style.backgroundColor = "green";
    this.el.style.position = "absolute";
    this.el.style.top = "200px";
    this.el.style.left = "400px";
  }

  //挂载钩子
  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  //卸载钩子
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  // 渲染函数
  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

function Child() {
  return (
    <div className="modal">
      这个是通过ReactDOM.createPortal创建的内容
    </div>
  );
}

export default class TwentyFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicks: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }

  render() {
    return (
      <div>
          <Button onClick={this.handleClick}>点击加1</Button>
        <p>点击次数为: {this.state.clicks}</p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}
