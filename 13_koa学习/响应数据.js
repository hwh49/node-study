const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const userRouter = new Router({prefix: '/users'})
userRouter.get('/', (ctx, next) => {
  // ctx.body = 'hello world'
  // ctx.body = {
  //   name: 'hwh',
  //   age: 18
  // }
  ctx.status = 204
  ctx.body = ['abc', 'cba', 'nba']
})


app.use(userRouter.routes())

app.listen(8000, () => {
  console.log('koa响应服务器启动成功')
})
