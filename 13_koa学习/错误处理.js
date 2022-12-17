const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  // 调用context的app的emit方法，第一个参数为事件名，第二个参数为错误信息，第三个参数为context
  ctx.app.emit('error', new Error('错误信息'), ctx)
})
app.on('error', (err, ctx) => {
  console.log(err.message)
  ctx.body = err.message
})
app.listen(8000, () => {
  console.log('koa错误处理服务器启动成功')
})
