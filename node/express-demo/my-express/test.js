const express = require('./index');
const app = express();

// use 方法第一个参数不写默认就是 /
app.use('/', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html;charset=UTF-8;');
  next();
})

app.get('/name', (req, res) => {
  // 设置响应头格式
  // res.setHeader('Content-Type', 'text/html;charset=UTF-8;');
  res.end('这是我的express，张三')
})

app.get('/age', (req, res) => {
  // 设置响应头格式
  // res.setHeader('Content-Type', 'text/html;charset=UTF-8;');
  res.end('这是我的express，24岁')
})

app.listen(8000, () => {
  console.log('Server at port 8000')
})