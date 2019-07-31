let API_ROOT = ''
if (
  location.hostname.indexOf('dev-') !== -1 ||
  location.hostname.indexOf('test-') !== -1 ||
  location.hostname === 'jiajiao.aijiatui.com'
) {
  API_ROOT = `https://${location.hostname}`
} else {
  API_ROOT = `https://dev-jiajiao.aijiatui.com`
}

export default API_ROOT
