import React from 'react'

export default class ThirtyFour extends React.Component{

    render(){
      const flag=true
        return (
            <div className={flag?"active":"no-active"}>这是技巧 34</div>
        )
    }
}