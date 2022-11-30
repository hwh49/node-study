const {promisify} = require('util') // 将一个普通函数转换为promise
const {vueRepo} = require('../config/repo-config')
const {commandSpawn} = require("../utils/terminal");
const {compile, writeToFile} = require("../utils/utils");
const path = require("path");
const fs = require("fs");
const child_process = require('child_process')

// 拉取模板-> npm install -> 运行 -> 打开浏览器
const createProjectAction = async (project) => {
  console.log('hwh is clone template')
  // 1. clone项目模板
  await child_process.execSync(`git clone -b master ${vueRepo} ${project}`)
  // 判断使用什么分隔符后 拼接出当前终端所在路径
  const pathSplit = process.platform === 'win32' ? '\\' : '/'
  const clonePath = process.cwd() + pathSplit + project + pathSplit + 'package.json'

  // 读取到package.json文件后修改name文件再写入
  let content = JSON.parse(fs.readFileSync(clonePath, {encoding: 'utf8'}))
  content.name = project
  fs.writeFileSync(clonePath, JSON.stringify(content))

  // 2. 执行 npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], {cwd: `./${project}`})

  // 3. 运行npm run serve
  await commandSpawn(command, ['run', 'serve'], {cwd: `./${project}`})
  // 4. 打开浏览器
  // open("http://localhost:8080/")
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
