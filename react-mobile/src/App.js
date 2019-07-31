import React from 'react';
import {Router} from 'react-router-dom';
import {Switch, Route ,Redirect} from 'react-router';
import {history,routes} from '@/router';



function getRouterByRoutes(routes){
  const renderedRoutesList = [];
  const renderRoutes = (routes,parentPath)=>{
    Array.isArray(routes)&&routes.forEach((route)=>{
      const {path,redirect,children,layout,component} = route;
      if(redirect){
        renderedRoutesList.push(<Redirect key={`${parentPath}${path}`} exact from={path} to={`${parentPath}${redirect}`}/>)
      }
      if(component){
        renderedRoutesList.push(
          layout?<Route 
            key={`${parentPath}${path}`} 
            exact path={`${parentPath}${path}`}
            render={(props)=>React.createElement(layout,props,React.createElement(component,props))} />:
          <Route 
              key={`${parentPath}${path}`} 
              exact 
              path={`${parentPath}${path}`} 
              component={component}/>)
      }
      if(Array.isArray(children)&&children.length>0){
        renderRoutes(children,path)
      }
    });
  }  
  renderRoutes(routes,'')
  return renderedRoutesList;
 
}
class App extends React.PureComponent{
  render(){
    return (
      <Router history={history}>
        <Switch>
          {getRouterByRoutes(routes)}
        </Switch>
      </Router>
    )
  }
}
export default App;