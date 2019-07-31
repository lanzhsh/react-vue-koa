import axios from "axios";
import baseUrl from "@/utils/config/index";

//设置axios拦截器
axios.interceptors.request.use((config : any) => {
  //在utils/request里面配置了请求头
  return config;
});
axios.interceptors.response.use(
  (response :any)=> {
    // console.log("response值为", response);
    response=response.data;
    //处理data
    return response;
  },
  (error : any) => {
    
    return Promise.reject(error);
  }
);

function request( url:any, method:"POST", data: {}, header:any, ...param:any ) {
  const token = sessionStorage.getItem("token") || "";
  return new Promise((resolve, reject) => {
    axios({
      baseURL: baseUrl,
      url,
      method,
      headers: {
         token,
        "X-Requested-With": "XMLHttpRequest",
        withCredentials: true
      },
      data,
      timeOut: 10000, //配置超时10s
      ...param
    }).then((res:any) => {
      resolve(res);
    });
  });
}

export default request;
