### react-pc-template
![react-pc-template](https://github.com/lanzhsh/react-vue-koa/blob/master/react-pc-template/assets/react-pc-template.jpg)
#### 项目简介
根据不同的的角色展示不同的列表,项目里涵盖了后台管理系统里90%的需求,没有多余的东西,如果有自己的需求单独加上即可,如富文本,拖拽网上都有现成的
#### 脚手架版本:
 *create-react-app@2
 这个版本用webpack.config.js替换了webpack.config.prod.js和webpack.config.dev.js
 
 #### 用到react相关的生态链模块:
  * `react`
  * `react-dom`
  * `react-router-dom`
  * `redux`: 
  * `react-redux`
  * `redux-actions`
  * `redux-thunk`
  * `antd`
 
 #### 项目要点
  * `less配置、antd按需加载`
  * `路由懒加载`
  * `根据权限生成动态路由`
  * `使用connect简化redux使用`
  * `全局数据请求拦截处理及loading`
  * `多个代理配置`
  * `常用表单封装、tabel封装`
  * `抽离第三方库文件dll`
  
  ### 项目启动步骤
1. 安装包
   cnpm/npm install 
2. 开发运行
  npm run start
3. 生产打包
  npm run dll (仅需运行一次)
  npm run build
