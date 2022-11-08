#!/usr/bin/env node

const program = require('commander')
const helpOptions = require('./lib/core/help')
// 查看版本号 也可以跟第二个参数，指定指令查看版本号 例如 ‘-v, --version’。但是会覆盖原来的-V
program.version(require('./package.json').version)

helpOptions()
// 输出指令
program.parse(process.argv)

