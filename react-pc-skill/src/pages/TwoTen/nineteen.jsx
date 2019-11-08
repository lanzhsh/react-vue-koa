import React from "react";
import { Button } from "antd";
import Dialog from "../../components/TwoTen/NineteenChild"

class NineteenChildOne extends React.Component {
  render() {
    const Dialog = () => <div>这是弹层1</div>;

    return this.props.dialogOneFlag && <Dialog />;
  }
}

export default class Nineteen extends React.Component {
  state={
    dialogOneFlag:false
  }
  
  oneSubmit=()=>{
    this.setState({dialogOneFlag:true})
  }

  oneCancel=()=>{
    this.setState({dialogOneFlag:false})  
  }

  twoSubmit=()=>{
    Dialog.show('这是弹层2')
  }

  twoCancel=()=>{
    Dialog.hide()
  }

  render() {
    const {dialogOneFlag} =this.state
    return <div>
        <NineteenChildOne dialogOneFlag={dialogOneFlag}></NineteenChildOne>
        <Button type="primary" onClick={this.oneSubmit}>点击出现弹层1</Button>
        <Button onClick={this.oneCancel}>点击关闭弹层1</Button>
        <Button type="primary" onClick={this.twoSubmit}>点击出现弹层2</Button>
        <Button onClick={this.twoCancel}>点击关闭弹层2</Button>
    </div>;
  }
}
