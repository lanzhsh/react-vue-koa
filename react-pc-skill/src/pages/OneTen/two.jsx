import React from "react";

export default class Two extends React.Component {
  constructor() {
    super()
    this.state = {
      arr:[
        {name:'曹操',age:26},
        {name:'张飞',age:26},
        {name:'貂蝉',age:26}
      ]
    }
  }  
  render() {
    const {arr} =this.state
    return (
      <div>
        {arr.map((item,index)=>{
          return(
          <div key={index}>
            <span>{item.name}</span>
            <span>{item.age}</span>
          </div>
          )
        })}
      </div>
    );
  }
}
