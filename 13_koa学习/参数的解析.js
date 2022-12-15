const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const multer = require('koa-multer')

const userRouter = new Router({prefix: '/users'})
const app = new Koa()
const upload = multer({})

// 解析query and params
userRouter.get('/:id', (ctx, next) => {
  console.log(ctx.params)
  console.log(ctx.request.query)
  ctx.response.body = 'hello world'
})
// app.use(userRouter.routes())

// 使用koa-multer解析form-data
app.use(upload.any())

// koa-bodyparser中间件可以解析json and urlencoded 并把参数放到context.request.body内
// app.use(bodyParser())


app.use((ctx, next) => {
  // console.log(ctx.request.body)
  console.log(ctx.req.body) // form-data的参数放在了req.body里
  ctx.response.body = 'hello register'
})

app.listen(8000, () => {
  console.log('koa参数服务器启动成功')
})
