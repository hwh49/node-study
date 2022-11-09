const {promisify} = require('util') // 将一个普通函数转换为promise
const {vueRepo} = require('../config/repo-config') // 下载地址
const download = promisify(require('download-git-repo')) // 将原本的函数转为promise
const createProjectAction = async (project) => {
  // 1. clone项目模板
  await download(vueRepo, project, {clone: true}) // project表示clone到哪个目录，clone：true表示也clone git记录等
  // 2. 执行 npm install
  // 3. 运行npm run serve
  // 4. 打开浏览器
}

module.exports = {
  createProjectAction
}
