/**
 *  获取 url 后面通过?传参的参数
 * @param {String} name
 */
export function getQueryString(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const url = window.location.href
  const search = url.substring(url.lastIndexOf('?') + 1)
  const r = search.match(reg)
  if (r != null) return unescape(r[2])
  return null
}
