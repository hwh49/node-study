let name = 'hwh'
let age = 20
const SayHello = (name) => {
  console.log('你好啊' + name)
}



// export 导出的并不是一个对象
// 在文件被解析时，export导出的内容就会被添加到一个模块环境记录内。他是实时更新的
// 所以当我们在导出的地方修改了export导出的内容时，导入的地方对应的内容也会被修改
setTimeout(() => {
  name = 'ldh'
}, [1000])


let info = {
  id: '1'
}
setTimeout(() => {
  console.log(info)
}, [4000])

export {
  name,
  age,
  SayHello,
  info
}
