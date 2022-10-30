// copy一个文件夹到指定
const path = require('path')
const fs = require('fs')

// 读取到传入的指定被拷贝文件夹 与新文件夹
const oldFilePath = path.resolve(process.argv[2])
const newFilePath = path.resolve(process.argv[3])

// 判断目前有没有新文件夹，没有则创建一个空文件夹
if (!fs.existsSync(newFilePath)) {
  fs.mkdir(newFilePath, err => {
    if (err) {
      console.log('创建新文件夹出现错误：', err)
    }
  })
}

function copyFiles(originFilePath, copyFilePath) {

  // 同步读取文件状态
  const state = fs.statSync(originFilePath)

  // 判断当前需要copy的是文件还是文件夹
  if (!state.isDirectory()) {
    // 是文件则直接获取文件名 然后与新目录做拼接然后copy
    const basename = path.basename(originFilePath)
    fs.copyFileSync(originFilePath, path.resolve(copyFilePath, basename))
    return;
  }

  // 读取文件夹下的文件
  fs.readdir(originFilePath, {withFileTypes: true}, (err, files) => {
    for (let file of files) {
      // 判断当前项是不是文件
      if (!file.isDirectory()) {

        // 获取旧文件所在路径
        const originFile = path.resolve(originFilePath, file.name)

        // 新文件保存路径
        let copyFile;

        if (path.extname(file.name) === '.js') {

          // basename获取文件名及扩展名，extname获取扩展名 然后用split分割，得到文件名不带扩展名
          const copyName = path.basename(file.name).split(path.extname(file.name))[0]
          // 最后再把扩展名改为.jsx
          copyFile = path.resolve(copyFilePath, copyName + '.jsx')
        } else {
          // 扩展名不为.js时，直接拼接
          copyFile = path.resolve(copyFilePath, file.name)
        }


        // 同步copy文件
        fs.copyFileSync(originFile, copyFile)
      } else {
        // 如果不是文件那就获取到旧文件夹路径，创建一个新的文件夹并递归
        const copyDirPath = path.resolve(copyFilePath, file.name)
        const originDirPath = path.resolve(originFilePath, file.name)
        fs.mkdir(copyDirPath,err => {
          if (err) {
            console.log('创建新文件夹出现错误：', err)
          }
        })

        copyFiles(originDirPath, copyDirPath)
      }
    }
  })
}

copyFiles(oldFilePath, newFilePath)

