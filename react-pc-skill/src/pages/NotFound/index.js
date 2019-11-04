import React from 'react'
import { Spin } from 'antd'
import './index.less'

export default class NotFound extends React.Component {
    state= {
        status:true
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                status:false
            })
        },1000)
    }

    componentWillUnmount(){
        // 卸载异步操作设置状态
        this.setState = (state, callback) => {
            return;
        }
    }

    render(){
        if(this.state.status){
            return (
                <div className="loading">
                    <Spin  tip="Loading..." />
                </div>
            )
        }
        return (
            <div className="loading">
                NotFound 404
            </div>
        )
    }
}