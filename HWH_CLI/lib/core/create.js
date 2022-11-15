const program = require('commander')
const {createProjectAction, addComponentAction, addStoreAndComponents} = require('./actions')
const createCommands = () => {
  program
      .command('create <project> [others...]') // 创建指令 create表示指令 <project>是参数，<>表示必选的， []表示可选的 ...表示可变的
      .description('clone a repository into a folder') // 指令描述
      .action(createProjectAction) // 执行函数
  program
      .command('addpage <name>')
      .description('add vue page, 例如: hwh addpage Home [-d src/components]')
      .action(name => {
        addComponentAction(name, program.opts().dest || 'src/components') // dest 组件的指定目录，把创建的组件放在哪个目录
      })
  program
      .command('addStore <store>')
      .description('add vue page and types config, 例如: hwh addStore Home [-d src/store/modules]')
      .action(name => {
        addStoreAndComponents(name, program.opts().dest || 'src/store/modules') // dest 组件的指定目录，把创建的组件放在哪个目录
      })
}

module.exports = createCommands
