const foo = require('./foo')

console.log(foo.name)
console.log(foo.age)
console.log(foo.a)

setTimeout(() => {
  console.log(foo.a)
  console.log(foo.name)
}, [2000])
