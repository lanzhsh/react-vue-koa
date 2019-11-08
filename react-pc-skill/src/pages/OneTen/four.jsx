import React from "react";

export default class Four extends React.Component {
  state = {
    count: 1
  };
  render() {
    let info
    if(this.state.count===0){
      info=(
        <span>这是数量为 0 显示</span>
      )
    } else if(this.state.count===1){
      info=(
        <span>这是数量为 1 显示</span>
      )
    }
    return (
      <div>
        {info}
      </div>
    );
  }
}

