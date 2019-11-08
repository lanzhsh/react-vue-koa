import React from 'react'

class TwentyOneChild extends React.PureComponent{
  render() {
    return <div>{this.props.name}</div>
  }
}

export default class TwentyOne extends React.Component{

    render(){
        return (
            <div>
              <TwentyOneChild name={'这是React.PureComponent的使用方法'}></TwentyOneChild>
            </div>
        )
    }

}