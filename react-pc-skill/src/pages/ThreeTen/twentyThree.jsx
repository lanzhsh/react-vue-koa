import React from 'react'

export default class TwentyThree extends React.Component{
    state={myVariable:null}
    render(){
        return (
            <div>{String(this.state.myVariable)}</div>
        )
    }
}
