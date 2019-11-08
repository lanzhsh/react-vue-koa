import React from "react";
import { Button } from 'antd'

export default class Five extends React.Component {
  state = {
    countOne:1,
    countTwo:2,
    countThree:3
  };
  clickOne(){
    let {countOne} = this.state
    this.setState({countOne:countOne+1})
  };
  clickTwo(){
    this.setState(({countTwo})=>({countTwo:countTwo+2}))
  };
  clickThree(){
    this.setState((state, props) => {
      return { count: state.countThree + 3 };
    });
  };
  render() {
    const {countOne,countTwo,countThree} =this.state
    return (
      <div>
        <div>
         <Button type="primary" onClick={this.clickOne.bind(this)}>点击加 1</Button><span>countOne 值为{countOne}</span>
        </div>
        <div>
          <Button type="primary" onClick={this.clickTwo.bind(this)}>点击加 2</Button><span>countOne 值为{countTwo}</span>
        </div>
        <div>
          <Button type="primary" onClick={this.clickThree.bind(this)}>点击加 3</Button><span>countOne 值为{countThree}</span>
        </div>
      </div>
    );
  }
}
