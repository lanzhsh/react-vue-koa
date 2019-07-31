import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'analysis', ...(require('E:/my-node/react-koa/react-template/pages/dashboard/models/analysis.js').default) });
app.model({ namespace: 'login', ...(require('E:/my-node/react-koa/react-template/pages/login/models/login.js').default) });
