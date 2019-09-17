/*
 * @Author: etongfu
 * @Email: 13583254085@163.com
 * @LastEditors: etongfu
 * @Description: local preview http server
 * @youWant: add you want info here
 * @Date: 2019-07-07 15:53:21
 * @LastEditTime: 2019-08-23 19:20:28
 */
const http = require('http')
const fs = require('fs')
const path = require('path')
const { Log } = require('./util')
const httpPort = 8088
const filePath = path.resolve(__dirname, '../dist/index.html')
const open = require('open')
// create current http server
http.createServer((req, res) => {
  Log.logger(req.url)
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    // deal resource
    if (req.url.indexOf('static') !== -1 || req.url.indexOf('vendor') !== -1 || req.url == "/favicon.ico") {
      const data = fs.readFileSync(path.resolve(__dirname, `../dist${req.url}`))
      return res.end(data)
    }
    // index.html
    res.setHeader('Content-Type','text/html;charset=utf-8')
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
  res.end(content)
  } catch (error) {
    Log.error('We cannot open "index.htm" file.')
  }
}).listen(httpPort, async () => {
  const location = `http://localhost:${httpPort}`
  Log.success(`Server listening on: ${location}, Open in the browser after 3 seconds`)
  // open default browser
  setTimeout(async ()=> {
    await open(location)
  }, 3000)
})