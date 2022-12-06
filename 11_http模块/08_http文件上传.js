const http = require('http')
const url = require('url')
const qs = require('querystring')
const fs = require('fs')

const server = http.createServer((req,res) => {
  const { pathname } = url.parse(req.url)
  if (pathname === '/upload') {
    if (req.method === 'POST') {
      req.setEncoding('binary') // 把流转换成二进制的
      // 获取到boundary后面的信息
      let boundary = req.headers['content-type'].split('; ')[1].replace('boundary=', '')
      let body = '' // 拼接文件

      req.on('data', data => {
        // console.log(data.toString())
        body += data
      })
      // 因为文件过大时，在data事件里边不能监听到所有的文件流 所以不适合在data事件里边写入
      req.on('end', () => {
        const payload = qs.parse(body, '\r\n', ':')
        console.log(payload, 'payload')
        const fileType = payload['Content-Type'].substring(1)
        const fileTypePosition = body.indexOf(fileType) + fileType.length
        let binaryData = body.substring(fileTypePosition)
        binaryData = binaryData.replace(/^\s\s*/, '')
        const fileData = binaryData.substring(0, binaryData.indexOf(`--${boundary}--`))
        fs.writeFile('./foo.jpg', fileData, 'binary', err => {
          console.log(err)
          console.log('文件上传完成')
        })
      })
      res.end('请求完成')
    }
  }

})

server.listen(8000, () => {
  console.log('8000端口已启动')
})
