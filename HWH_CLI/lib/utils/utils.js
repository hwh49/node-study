const path = require('path')
const ejs = require('ejs')
const fs = require('fs')

// 返回ejs模板
const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}` // 获取到模板的位置
  const templatePath = path.resolve(__dirname, templatePosition) // 拼接为绝对路径
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, {data}, {}, (err, result) => {
      if(err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

// 写入文件
const writeToFile = (path, content) => {
    // 判断当前路径是否存在
    if (!fs.existsSync(path)) {
      return mkdir(path, content);
    } else {
      return fs.promises.writeFile(path, content)
    }

}

// 创建路径
function mkdir(filePath, content) {
  // 不同系统分隔符不一致
  const delimiter = process.platform === 'win32' ? '\\' : '/'
  const dirCache={}; // 保存已创建的路径
  let arr=filePath.split(delimiter); // 分割后单个创建文件夹
  let dir=arr[0];
  for(let i=1;i<arr.length;i++){
    if(!dirCache[dir]&&!fs.existsSync(dir)){
      dirCache[dir]=true;
      fs.mkdirSync(dir, (err => {
        console.log('创建错误')
      }));
    }
    dir=dir+'/'+arr[i];

  }
  fs.writeFileSync(filePath, content)
}

module.exports = {
  compile,
  writeToFile
}
