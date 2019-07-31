import axios from "axios";
import baseUrl from "./config/index";

//设置axios拦截器
axios.interceptors.request.use(config => {
  config.headers.cityCode = window.sessionStorage.cityCode; //jsCookie.get('cityCode')
  return config;
});
axios.interceptors.response.use((response) => {
  //处理data
  return response.data;
});

function request({
  url,
  method = "POST",
  data = {},
  header,
  params,
  ...param
}) {
  const token = sessionStorage.getItem("token") || "";
  return new Promise((resolve, reject) => {
    axios({
      baseURL: baseUrl,
      url,
      method,
      headers: {
        "i-manage-token": token,
        "X-Requested-With": "XMLHttpRequest",
        withCredentials: true
      },
      data,
      params,
      timeOut: 10000, //配置超时10s
      ...param
    }).then(res => {
      resolve(res);
    });
  });
}

export default request;
