const name = 'hwh'
const age = 18

// exports是一个特殊的全局对象，其实也不是一个对象，只能每个文件都有的一个模块
// 默认他是一个空对象
exports.name = name
exports.age = age

// module.exports 与exports的关系
// 每个文件中真正导出的是module.exports
// 但是在node的源码中，有module.exports = exports的操作。所以当我们不改变module.exports的引用地址时，他就是指向exports的引用值

// 如果这样改变了module.exports的引用地址，则上面的exports的操作就没用了
// module.exports = {
//   name: 'ldh',
//   age: 20
// }

let a = '这是a'

setTimeout(() => {
  a = 'a被改变了'
  module.exports.name = 'buzhidao'
}, [1000])

module.exports = {
  a, // 这是一个简单类型，在内存中是值传递，再赋值给这个对象的时候他的值是'这是a', 即使这个a在一秒钟后被改变了，在module.exports里面的a已经跟外面的a没有关系了
  name,
  age
}
