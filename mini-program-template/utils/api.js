import { envConfig } from './config/index'
//配置请求baseUrl
const HOST = `https://${envConfig.host}`

const API={
  login: `${HOST}/teaching/applet/login`, // 登录
}

export default API