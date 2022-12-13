const express = require('express')

// 使用use注册一个中间件
const app = express()

// 使用路径匹配 不限制于什么类型的请求
// 如果有多个中间件，不使用next的情况下 只会执行第一个中间件
app.use('/home', (req, res, next) => {
  console.log('第一个')
  // next()
  res.end('匹配到第一个')
})


app.use((req, res, next) => {
  console.log('第二个')
  res.end('匹配到home')
})

app.listen(8000, () => {
  console.log('普通中间件服务器启动成功')
})
