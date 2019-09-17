import axios from 'axios'
import baseUrl from './config/index'

// 设置axios拦截器
axios.interceptors.request.use(config => {
  config.headers.token = sessionStorage.token // jsCookie.get('cityCode')
  return config
})
axios.interceptors.response.use((response) => {
  // 处理data
  return response.data
})

// axios默认配置
axios.defaults.timeout = 10000 // 超时时间
axios.defaults.baseURL = baseUrl // 默认地址

export const get = (url, params, options) => {
  return axios({
    method: 'get',
    url,
    params,
    ...options
  })
}

export const post = (url, data, options) => {
  return axios({
    method: 'post',
    url,
    data,
    ...options
  })
}

export default request
