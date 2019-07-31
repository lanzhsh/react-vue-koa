import axios from "axios";
import baseUrl from "./config/index";

//设置axios拦截器
axios.interceptors.request.use(config => {
  //在utils/request里面配置了请求头
  return config;
});
axios.interceptors.response.use(
  response => {
    // console.log("response值为", response);
    //处理data
    // response=response.data;
    return response;
  },
  error => {
    if (error.response.code === "200") {
      this.$notify.warning({
        title: "警告",
        message: `登录信息已过期，请重新扫码登录`
      });
      // sessionStorage.setItem("loginFlag", false);
      // setTimeout(() => {
      //   this.$router.push({ path: "/login" });
      // }, 1000);
    }
    return Promise.reject(error);
  }
);

function request({ url, method = "POST", data = {}, header, ...param }) {
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
      timeOut: 10000, //配置超时10s
      ...param
    }).then(res => {
      resolve(res);
    });
  });
}

export default request;
