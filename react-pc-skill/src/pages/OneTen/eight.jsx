import React from "react";
import Child from "../../components/OneTen/Eight"

class RefOne extends React.Component{
  componentDidMount() {
    this.refs['box'].innerHTML='这是 div 盒子,通过 ref 获取'
  }
  render(){
    return(
      <div ref="box"></div>
    )
  }
}

class RefTwo extends React.Component{
  componentDidMount() {
    this.input.value='这是输入框默认值';
    this.input.focus();
  }
  render(){
    return(
      <input ref={comp => { this.input = comp; }}/>
    )
  }
}

class RefThree extends React.Component{
  constructor(props){
    super(props);
    this.myRef=React.createRef();
  }
  componentDidMount(){
    console.log(this.myRef.current);
  }
  render(){
    return <input ref={this.myRef}/>
  }
}

class RefFour extends React.Component{
  constructor(props){
    super(props);
    this.myFourRef=React.createRef();
  }
  componentDidMount(){
    console.log(this.myFourRef.current);
  }
  render(){
    return <Child ref={this.myFourRef}/>
  }
}

export default class eight extends React.Component {
  render() {
    return (
      <div>
        <RefOne></RefOne>
        <RefTwo></RefTwo>
        <RefThree></RefThree>
        <RefFour></RefFour>
        
      </div>
    );
  }
}
