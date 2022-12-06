const http = require('http')

// http发送get请求
// http.get('http://localhost:8000', (res) => {
//   // 需要监听事件，才能获取到请求结果
//   res.on('data', (data)=> {
//     console.log(data.toString())
//   })
//   res.on('end', () => {
//     console.log('获取到所有的结果')
//   })
// })

// http发送post请求 发送除get请求外的所有请求都得以这种形式
const req = http.request({
  method: 'POST',
  pathname: 'http://localhost',
  port: 8000
}, res => {
  res.on('data', data => {
    console.log(data.toString())
  })
  res.on('end', () => {
    console.log('获取到了所有结果')
  })

})

req.end()  // 结束请求

