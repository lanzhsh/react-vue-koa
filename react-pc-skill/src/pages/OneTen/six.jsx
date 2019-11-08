import React from "react";
import { Button } from 'antd'

export default class Six extends React.Component {
  state = {
    countOne:1,
    changeFlag:''
  };
  clickOne(){
    let {countOne} = this.state
    this.setState({countOne:countOne+1})
  };
  static getDerivedStateFromProps (nextProps){
    console.log('变化执行')
    return{
      changeFlag:'state 值变化执行'
    }
  }
  render() {
    const {countOne,changeFlag} = this.state
    return (
      <div>
        <div>
         <Button type="primary" onClick={this.clickOne.bind(this)}>点击加 1</Button><span>countOne 值为{countOne}</span>
        <div>{changeFlag}</div>
        </div>
      </div>
    );
  }
}
