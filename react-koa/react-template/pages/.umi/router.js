import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/dashboard/analysis",
        "exact": true,
        "component": require('../dashboard/analysis.js').default,
        "_title": "react-pc-template",
        "_title_default": "react-pc-template"
      },
      {
        "path": "/dashboard/monitor",
        "exact": true,
        "component": require('../dashboard/monitor.js').default,
        "_title": "react-pc-template",
        "_title_default": "react-pc-template"
      },
      {
        "path": "/dashboard/workplace",
        "exact": true,
        "component": require('../dashboard/workplace.js').default,
        "_title": "react-pc-template",
        "_title_default": "react-pc-template"
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default,
        "_title": "react-pc-template",
        "_title_default": "react-pc-template"
      },
      {
        "path": "/login/login",
        "exact": true,
        "component": require('../login/login.js').default,
        "_title": "react-pc-template",
        "_title_default": "react-pc-template"
      },
      {
        "component": () => React.createElement(require('E:/my-node/react-koa/react-template/node_modules/_umi-build-dev@1.8.0@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false }),
        "_title": "react-pc-template",
        "_title_default": "react-pc-template"
      }
    ],
    "_title": "react-pc-template",
    "_title_default": "react-pc-template"
  },
  {
    "component": () => React.createElement(require('E:/my-node/react-koa/react-template/node_modules/_umi-build-dev@1.8.0@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false }),
    "_title": "react-pc-template",
    "_title_default": "react-pc-template"
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
