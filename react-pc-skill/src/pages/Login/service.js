import request from '../../utils/request'
// 登陆
export function login( data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}
// 2.获取商户支持的支付方式
export function queryByOwenerIdAndOwnerType( params) {
  return request({
    url: '/api/productSubscribe/queryByOwenerIdAndOwnerType',
    method: 'get',
    params,
  })
}