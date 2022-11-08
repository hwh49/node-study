const program = require('commander')

const helpOptions = () => {
  // 增加自己的options
  program.option('-h --hwh', 'a hwh cli') // 第一个参数为指令，第二个参数为解析
  program.option('-d --dest <dest>', 'a destination folder, 例如： -d /src/components')

  // 监听事件，执行回调
  program.on('--help', function () {
    console.log('the help')
  })
}

module.exports = helpOptions
