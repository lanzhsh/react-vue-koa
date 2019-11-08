import React from "react";
import { Button } from 'antd'

export default class Three extends React.Component {
  state = {
    flag: true,
    flagOne: 1
  };
  click(data1,data2){
    console.log('data1 值为',data1)
    console.log('data2 值为',data2)
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.click.bind(this,'参数 1','参数 2')}>点击事件</Button>
      </div>
    );
  }
}
