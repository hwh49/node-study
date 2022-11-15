const {promisify} = require('util') // 将一个普通函数转换为promise
const {vueRepo} = require('../config/repo-config')
const {commandSpawn} = require("../utils/terminal");
const {compile, writeToFile} = require("../utils/utils");
const path = require("path"); // 下载地址
const download = promisify(require('download-git-repo')) // 将原本的函数转为promise

// 拉取模板-> npm install -> 运行 -> 打开浏览器
const createProjectAction = async (project) => {
  console.log('hwh is clone template')
  // 1. clone项目模板
  await download(vueRepo, project, {clone: true}) // project表示clone到哪个目录，clone：true表示也clone git记录等
  // 2. 执行 npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], {cwd: `./${project}`})
  // 3. 运行npm run serve
  await commandSpawn(command, ['run', 'serve'], {cwd: `./${project}`})
  // 4. 打开浏览器
  open("http://localhost:8080/")
}

// 添加组件
const addComponentAction = async (name, dest) => {
  // 1. 编辑ejs的模板
  const result = await compile('vue-component.ejs', {name, lowerName: name.toLowerCase()});
  // 2. 写入文件的操作
  const targetPath = path.resolve(dest, `${name}.vue`)
  writeToFile(targetPath, result)
}

const addStoreAndComponents = async (name, dest) => {
  // 1. 获取模板
  const storeResult = await compile('vue-store.ejs', {})
  const typesResult = await compile('vue-types.ejs', {})

  // 2. 创建文件
  const targetDest = path.resolve(dest, name.toLowerCase())
  const targetPagePath = path.resolve(targetDest, `${name}.js`)
  const targetRouterPath = path.resolve(targetDest, 'type.js')
  writeToFile(targetPagePath, storeResult)
  writeToFile(targetRouterPath, typesResult)
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addStoreAndComponents
}
