const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  // context(ctx)把request和response都封装在里面了
  // 并且body方法替代了end
  ctx.response.body = 'hello world'
})

app.listen(8000, () => {
  console.log('koa初体验服务器启动成功')
})
