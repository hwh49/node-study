const program = require('commander')
const {createProjectAction} = require('./actions')
const createCommands = () => {
  program
      .command('create <project> [others...]') // 创建指令 create表示指令 <project>是参数，<>表示必选的， []表示可选的 ...表示可变的
      .description('clone a repository into a folder') // 指令描述
      .action(createProjectAction) // 执行函数
}

module.exports = createCommands
