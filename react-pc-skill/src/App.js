import React from 'react'
import renderRoutes from './utils/renderRoutes'
import routes from "./router.js";
import { HashRouter as Router, Switch  } from "react-router-dom";
import connect from './utils/connect'

@connect
class App extends React.Component{
    render(){
        const authPath = '/login' // 默认未登录的时候返回的页面，可以自行设置
        let authed = this.props.state.authed || localStorage.getItem('authed') // 如果登陆之后可以利用redux修改该值
        return (
            <Router>
                <Switch>
                    {renderRoutes(routes, authed, authPath)}
                </Switch>
            </Router>
        )
    }
}

export default App
