const Koa = require('koa')

const app = new Koa()

// koa的中间件没有.get, .post等等之类的请求， 也不能连续注册中间件，第一个参数也不能设置为路径
// 只能通过use的方法注册
app.use((ctx, next) => {
  if (ctx.request.path === '/users') {
    if (ctx.request.method === 'POST') {
      ctx.response.body = 'create user Success~~'
    } else {
      ctx.response.body = 'user lists~~'
    }
  } else {
    ctx.response.body = 'other request Response'
  }
})

app.listen(8000, () => {
  console.log('koa中间件服务器启动成功')
})
