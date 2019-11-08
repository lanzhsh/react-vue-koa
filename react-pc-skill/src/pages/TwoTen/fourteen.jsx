import React from "react";
import { Button } from 'antd'

class FourteenChildOne extends React.Component {
    render() {
        return <div>这是动态组件 1</div>;
    }
}

class FourteenChildTwo extends React.Component {
    render() {
        return <div>这是动态组件 2</div>;
    }
}

export default class Fourteen extends React.Component {
  state={
      oneShowFlag:true
  }
  tab=()=>{
      this.setState({oneShowFlag:!this.state.oneShowFlag})
  }
  render() {
    const {oneShowFlag} = this.state
    return (<div>
        <Button type="primary" onClick={this.tab}>显示组件{oneShowFlag?2:1}</Button>
        {oneShowFlag?<FourteenChildOne></FourteenChildOne>:<FourteenChildTwo></FourteenChildTwo>}
    </div>);
  }
}
