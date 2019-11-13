import React from 'react'
import Test from '../../utils/decorators'

@Test

class TwentyNine extends React.Component{
    componentDidMount(){
        console.log(this,'decorator.js') // 这里的this是类的一个实例
        console.log(this.testable)
    }
    render(){
        return (
            <div>这是技巧2,装饰器的使用</div>
        )
    }
}

export default TwentyNine
