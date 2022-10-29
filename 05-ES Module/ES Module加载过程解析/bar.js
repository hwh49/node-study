import {name, age, SayHello, info} from './foo.js'

console.log(name)
console.log(age)
SayHello('hwh')
setTimeout(() => {
  console.log('定时器内打印name:' + name)
}, [2000])
console.log(info)

// 如果导入内容不是一个引用值的话，去修改是会报错的。因为在模块环境记录内，这个name是会变为用const声明的。但是在导出文件可以进行修改
// 或者导入值是一个引用值时，也可以修改内部的内容。因为导入的是一个引用地址(但是也不能修改引用地址)
setTimeout(() => {
  // name = 'wyz'
  // info = {id: '2'}  // 这样修改会报错

  info.id = '2' // 这样修改不会
}, [3000])
