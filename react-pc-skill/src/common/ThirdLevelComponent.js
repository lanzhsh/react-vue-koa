import React from 'react'
import { Route, Switch } from "react-router-dom";
import NotFound from '../pages/NotFound'
import connect from '../utils/connect'
@connect

class ThirdLevelComponent extends React.Component{

    render(){
        const permissionList = this.props.state.permissionList
        const path = this.props.match.path
        const item = permissionList.find(item =>{
            return path.indexOf(item.path) !== -1
        })
        const currentList = item.children.filter(item =>{
            return item.path === path
        })
        let list = []
        if( currentList.length>0 && currentList[0].children ){
            list = currentList[0].children.map((item,index) => {
                return (
                    <Route
                        routes={item.path}
                        key={index}
                        exact
                        path={item.path}
                        component={item.component}
                    />
                )
            })
            return (
                <div>
                    <Switch>
                        {
                            list
                        }
                        <Route component={NotFound}/>
                    </Switch>
                </div>
                
            )
        }else{
            return (
                <div>...</div>
            )
        }
    }
}
export default ThirdLevelComponent