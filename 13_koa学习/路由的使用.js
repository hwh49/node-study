const Koa = require('koa')
const userRouter = require('./router/user')

const app = new Koa()
app.use(userRouter.routes()) // 使用路由中间件
app.use(userRouter.allowedMethods()) // 不支持的方法(例如post, put)会自动返回对应的错误信息

app.listen(8000, () => {
  console.log('koa路由服务器启动成功')
})
