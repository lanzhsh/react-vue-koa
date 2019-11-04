const proxy = require('http-proxy-middleware')
module.exports = function (app) {
    // ...You can now register proxies as you wish!
    app.use(proxy('/randy', {
        target: 'http://47.105.71.81:3306',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/randy": ""
        },
    }));
    app.use(proxy('/peter', {
        target: 'http://172.19.5.34:9531',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/peter": ""
        },
    }));
};