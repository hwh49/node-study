const fs = require("fs");
const path = require("path");
const dirname = '../hwh'

// 1.创建文件夹
// existsSync 判断有没有这个文件夹
if (!fs.existsSync(dirname)) {
  fs.mkdir(dirname, err => {
    console.log(err)
  })
}

// 2.获取文件夹下的内容 fs.readdir方法只能读取一层文件，例如文件内有文件夹，则需要遍历读取
fs.readdir(dirname, (err, files) => {
  console.log(files)
})

// 获取文件夹下所有文件
function readFolders(folder) {
  // withFileTypes 遍历时传入文件对象
  fs.readdir(folder,{withFileTypes: true},(err, files) => {
    files?.forEach(file => {
      // isDirectory判断是不是文件夹 是文件夹则拼接路径继续遍历
      if(file.isDirectory()) {
        const newFolder = path.resolve(dirname, file.name)
        readFolders(newFolder)
      } else {
        console.log(file.name)
      }
    })
  })
}

readFolders(dirname)

// 3.文件重命名
fs.rename('../hwh', '../coder', err => {
  console.log(err)
})
