const express = require('express')
const multer = require('multer')
const path = require("path");

const app = express()

// diskStorage表示保存在硬盘里
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  // dest: 'uploads/' // 接收到传递过来的参数文件的保存地址 使用这种方式，保存的文件，没有后缀名，且名称不能自定义
  storage
})
app.use(express.urlencoded({extended: true})) // 解析请求格式为form-urlencoded
app.use(upload.any())

// 经过上面的中间件解析后的参数都会放在req的body里边
app.post('/login', (req, res, next) => {
  console.log(req.body)
  res.end('用户登录成功')
})

// 单个文件使用single, 多个文件使用array 参数为，请求参数中文件的key
app.post('/upload', (req, res, next) => {
  res.end('文件上传成功')
}, upload.single('file'))

app.listen(8000, () => {
  console.log('文件上传服务器启动成功')
})
