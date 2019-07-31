let API_ROOT = '',host=location.host
switch(host){
  case 'pre.my.com':
    API_ROOT='pre'
    break
  case 'test.my.com':
    API_ROOT='test'
    break
  case 'checkout.my.com':
    API_ROOT='checkout'
    break
  case 'business.my.com':
    API_ROOT='prod'
    break
  default:
    API_ROOT='http://localhost:5220'
    break
}
export {
  API_ROOT
}

export default API_ROOT