const express = require('express')
const multer = require('multer')

const app = express()
const upload = multer()

app.use(express.json()) // 解析请求格式为json字符串
app.use(express.urlencoded({extended: true})) // 解析请求格式为form-urlencoded
app.use(upload.any())

// 经过上面的中间件解析后的参数都会放在req的body里边
app.post('/login', (req, res, next) => {
  console.log(req.body)
  res.end('用户登录成功')
})

app.listen(8000, () => {
  console.log('登录服务器启动成功')
})
