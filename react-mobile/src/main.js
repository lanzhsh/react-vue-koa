/**
 * Created by wuming on 2017/7/11.
 */
// import '@/utils/antm-viewport.min';
import '@/assets/fonts/iconfont.css'
import '@/assets/css/reset.scss'
import '@/assets/css/common.css'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from '@/store';
// import '@babel/polyfill';
const store = configureStore();
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("app")
);