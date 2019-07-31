//配置请求baseUrl
import { envConfig } from './config/index'
const HOST = `https://${envConfig.host}`

const API = {
  login: `${HOST}/teaching/applet/login`, // 登录
  pageData: `${HOST}/teaching/applet/pageData`, // 首页数据
}

export default API