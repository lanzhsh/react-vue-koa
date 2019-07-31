/*
  type：请求方法
  data: 发送的数据
  url: 请求的url
  success:回掉函数
*/
const ajaxNative=function (option) {
  //1.创建异步对象
  var xhr = new XMLHttpRequest();
  //2.请求行
  if (option.type == 'get' && option.data) {
    option.url += '?';
    option.url += option.data;
    // 如果是get请求 那么 把data 设置为null 发送的时候 就相当于 发送null
    option.data = null;
  }
  xhr.open(option.type, option.url);
  //3.请求头(get请求可以省略)
  if (option.type == 'post' && option.data) {
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  }
  //4.注册状态改变事件
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200){
      let type = xhr.getResponseHeader('content-type');
      if (type.indexOf('json') != -1) {
       option.success(JSON.parse(xhr.responseText));
         return;
      }
      if (type.indexOf('xml') != -1) {
        option.success(xhr.responseXML);
        return;
      }
      option.success(xhr.responseText);
    }
  }

  //5.发送请求
  xhr.send(option.data);
}
export default ajaxNative