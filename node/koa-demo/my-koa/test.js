const Koa = require("./index")
//引入路由
const Router = require("koa-router")
const app = new Koa()
const router = new Router()

//启动路由；
app.use(router.routes())
//作用： 可以看到router,allowedMethods()用在了路由匹配router.routeres()之后，所以在但所有路由中间最后调用，此时根据ctx,status,设置，response 相应头
app.use(router.allowedMethods())

router.get('/name', (cty, next) => {
  cty.body = '这是myKoa，前端'
})

app.listen(3000, (err) => {
  if (!err) {
    console.log("Server at port 3000! ")
  }
})