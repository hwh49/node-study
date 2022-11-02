## node-study

#### `V8引擎怎么运行js代码的？`

V8引擎用于chrome和node，他可以独立运行，也可以嵌入到C++等应用程序。

`执行js的流程`

![image-20221025220237457](./node.assets/image-20221025220237457.png)

`Parse模块`: Parse模块会将js代码转换成为AST，这是因为解释器不认识js代码。如果函数没有调用，那么是不会被转换成AST的

`Ignition`：解释器，会将AST转换成为ByteCode(字节码),同时会收集TurboFan优化所需要的信息(比如函数参数的类型信息，有了类型信息才能进行真实的运算) 

`TurboFan`：编译器，可以将字节码编译为CPU可以直接执行的机器码

#### `node的REPL`

什么是REPL？

​	REPL是一个简单的，交互式的编程环境。我们在浏览器的控制台就相当于一个REPL，可以输入简单的js代码进行运行

![image-20221025231412178](./node.assets/image-20221025231412178.png)

我们在vscode的终端中直接输入node敲回车也能够打开一个REPL的环境进行执行一些简单的js代码

#### `使用nvm进行版本管理`

安装nvm前提必须先卸载原本的node

然后在https://github.com/coreybutler/nvm-windows/releases选择nvm-setup.zip进行下载

下载完成后直接安装，并为nvm配置镜像

```
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

然后使用`nvm list available`查看可用的node版本

安装使用`nvm install [version]`，卸载使用`nvm uninstall [version]`

安装完成后使用`nvm use [version]`切换到指定的版本

如果`nvm use [version]`报错`exit status 1:乱码`

则(使用管理员权限的PowerShell打开)输入`chcp 65001`之后再次输入`nvm use [version]`则可以把乱码解析

#### `给node传递参数`

在浏览器中，有个顶级对象叫window。里面包含了很多的东西。但是在node里，我们打印window，他是一个undefined。而在node中，他的顶级对象是是什么呢？

`process`：我们可以在js文件中打印process，然后使用node运行。这个就是node中的顶级对象

例如我们输入`node index.js hwh age=18`这样的命令，则我们传递的参数去哪里了呢？

想这样的传递参数的方式，我们可以在process.argv中可以看到所传递的参数。他是一个数组，原本就会内置有两个元素，node程序所在路径和当前运行的文件的路径

![image-20221027220321321](./node.assets/image-20221027220321321.png)

#### `node中的全局对象`

`__dirname`：获取当前文件所在路径

`__filename`：获取当前文件所在路径及当前文件名

`process`：提供了很多关于node进程中相关的对象

`console`：内置有很多的方法

还有很多定时器的全局对象

`global对象`：类似于浏览器的window对象，但是里面内置了很多的属性与方法。与window对象不同的地方在于

```javascript
window:
	var name = 'hwh'
	console.log(window.name) // hwh
	
global:
	var name = 'hwh'
	console.log(global.name) // undefined

// 在全局声明的一个变量或函数，都会被添加到window中。但是node环境下并不会添加到global对象中
```

### `CommonJS`

CommonJS是一个规范，最早是提出来在浏览器以外的地方使用的。后来再node上也对CommonJS进行了支持和实现。让我们在开发node的过程中，可以更方便的进行模块化开发

在node中，每个js文件都是单独的一个模块，这个模块中包括CommonJS的核心变量：`exports`，`module.exports`，`require`。我们可以使用这些变量方便的进行开发、

`exports和module.exports`：可以对模块中的内容进行导出，实际上导出的是module.exports。在node源码里`module.exports = exports`。所以默认他们是相等的

`require`：导入其他模块中的内容

所谓的导出就是：exports默认是一个空对象，而上面保存的是这个空对象的引用地址。当我们`require`导入这个文件的时候，返回的就是`exports`的引用地址。

### `require`

require导入模块的细节：

1. 查找规则
   - 比如我们导入一个核心模块`const path = require('path')`，会直接返回这个核心模块，停止查找
   - `require`函数内的字符串是以./或../或/开头的，说明查找的是本地文件或目录
     - 如果没有后缀名，会按照如下顺序进行查找
       - 直接查找文件X -> 查找X.js -> 查找X.json -> 查找X.node
     - 如果使用上述方法没有找到，则把X当作一个目录然后按照如下顺序进行查找
       - 查找X/index.js -> 查找X/index.json -> 查找X/index.node
     - 如果上述两种方法都没有找到，则报错
   - 直接是一个X(没有路径),并且X不是一个核心模块
     - 在我们每个文件中都会有一个module模块，这个module模块内会包含当前文件一直到根目录的node_modules文件的路径，当我们导入的X不是一个核心模块也没有路径时，就会到node_modules里面找
     - ![image-20221029132224455](./node.assets/image-20221029132224455.png)
     - 上述方式找不到时就会报错
   - 上述查找规则是node默认的顺序，我们可以在配置文件中修改查找的顺序
2. 模块的加载过程
   1. 模块在被第一次引入时，模块内的代码会被运行一次
   2. 模块被多次引入时，会被缓存，最终只会运行一次
      - 为什么只会加载一次？因为每个模块的module对象都有一个loaded属性，当第一次加载时，就被设为了true，这样第二次引用的时候，看到值为true，则去查找缓存
   3. 如果有循环引入，那么会从根节点开始，找到依赖的模块，并进行深度优先搜索的方式加载，然后缓存
      - 深度优先搜索是什么意思？就是我们在A.js里面引用了B.js，在B.js中引用了C.js，C.js中引用了A.js。那么首先加载A.js时执行到`require导入函数时`，则加载B，然后加载C，但是在C里边不会在运行A，因为A.js的module.loaded值为true，代表已经被加载过了，此时使用缓存就可以了
   4. `require函数是同步加载的`

### `ES Module加载过程解析`

CommonJS是同步的，但是ES Module是异步的。而且export {} 导出的不是一个对象。在解析阶段，js引擎看到export导出内容时，就会创建一个环境模块记录，并且这个记录是实时的。

`注意点`

1. 如果导出的不是一个 引用值
   1. 我们在导出文件修改变量时，导入文件对应的变量也会实时更新。但是导入文件不能修改这个变量，因为在环境模块记录中。这个变量的已经改成了常量
2. 如果导出的是一个引用值
   1. 那我们在导入导出文件都可以修改，但是不能修改引用地址。可以修改里边的属性或方法
   2. ![image-20221029211153324](./node.assets/image-20221029211153324.png)

#### `node对ES Module的支持`

![image-20221030093048848](./node.assets/image-20221030093048848.png)

我们像这样使用是会报错的，为什么呢？

1. 因为在node中默认支持的是CommonJS，而ES Module需要在package.jon中配置`type: module`
2. 或者文件名使用`.mjs`结尾，表示这是ES Module的模块

#### `ES Module与CommonJS的相互使用`

1. ES导出，CJS导入
   1. ![image-20221030101637113](./node.assets/image-20221030101637113.png)
   2. 会报错，CJS是同步加载的，而ES必须经过静态分析等，无法在这个时候执行javascript代码。起码在node环境这种方式是不支持的，其他环境有可能会支持
2. CJS导出，ES导入
   1. ![image-20221030101927263](./node.assets/image-20221030101927263.png)
   2. node环境中支持这种方式

### `常见的模块`

#### `path`

path.resolve用于拼接路径，为什么不用字符串拼接的方法去拼接路径呢？

​	因为在不同的电脑中，有的使用 \ 或 \\ \ 或 /。所以为了避免出现bug。我们可以使用node中的path模块的resolve方法，他会自动给我们转换为电脑所适用的方法

![image-20221030105107734](./node.assets/image-20221030105107734.png)

其他api

![image-20221030144956189](./node.assets/image-20221030144956189.png)

### `fs`

fs是node内置的文件系统，为什么要内置一个文件系统呢？

​	因为在不同的操作系统，他们对文件的操作都是有差异的。所以为了兼容性，node自己封装了一套文件系统

fs中有很多的api，但是这些api大多数都提供了三种操作方式

1. 同步操作文件
   - 代码会被阻塞
   - ![image-20221030154624112](./node.assets/image-20221030154624112.png)
   - 会先打印state，再往后执行
2. 异步回调函数操作文件
   - 代码不会被阻塞，需要传入回调函数，得到结果时，回调函数被执行
   - ![image-20221030154834662](./node.assets/image-20221030154834662.png)
3. 异步promise操作文件
   - 代码不会被阻塞，通过fs.promises调用方法操作，会返回一个promise
   - ![image-20221030155025002](./node.assets/image-20221030155025002.png)

以上方式都是获取一个文件的状态，返回值为

![image-20221030155135000](./node.assets/image-20221030155135000.png)

#### `文件描述符`

文件描述符是什么？

​	在POSIX系统上，对于每个进程，内核都维护着一张当前打开的文件和资源的表格。每个打开的文件都分配一个称为文件描述符的简单的数字。在系统层，所有文件系统操作都使用这些文件描述符来标识和跟踪每个特定的文件

为了简化用户的工作，node为所有打开的文件分配一个新的文件描述符。使用`fs.open`方法来分配。

一旦被分配，则文件描述符可用于从文件读取数据，向文件写入数据，或请求关于文件的信息等

![image-20221030155746858](./node.assets/image-20221030155746858.png)

#### `文件的读写`

如果我们希望对文件内容进行操作，这个时候可以使用文件的读写

`fs.readFile`：读取文件内容

1. 第一个参数为文件路径，第二个参数可以配置flag,encoding，第三个是一个回调
   1. `flag`: 写入的方式
   2. encoding：字符的编码
   3. ![image-20221030193220204](./node.assets/image-20221030193220204.png)

`fs.writeFile`：写入内容

1. ![image-20221030193333801](./node.assets/image-20221030193333801.png)

#### `文件夹的操作`

![image-20221030200850878](./node.assets/image-20221030200850878.png)

### `events`

events是一个事件体系，可以监听，发出或取消事件等相关的操作

![image-20221030205954725](./node.assets/image-20221030205954725.png)

#### `node实现复制功能脚本`

需要在执行node命令中输入被拷贝文件夹(或是文件)与需要拷贝的文件夹

```javascript
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


```

### `包管理工具`

如果将我们的代码给分享出去供别人使用呢？

可以将我们的代码上传到GitHub，或者使用专业的包管理工具，然后将代码发布到特定的位置，供别人下载。目前可以通过npm来实现这一方式

#### `npm`

通过npm管理的包可以在https://www.npmjs.org进行查看，搜索

则我们通过npm发布的代码是保存在registry上的。

当我们使用在终端输入`npm init -y`时，会在此文件夹下创建一个package.json文件作为项目配置文件

##### `package.json常见属性`

1. name: 项目的名称
2. version：当前项目的版本号
3. description：项目的基本描述
4. author：作者相关信息
5. license：开源协议(发布时需要用到)
6. private：记录当前项目是否是私有的。值为true时，使用发布命令时不能发布出去的
7. main：设置程序的入口，这一入口主要应用于别人使用我们的包时，`const axios = require('axios')`的入口。与webpack设置的入口是两回事
8. script：配置脚本命令，以键值对的方式存在，配置后以`npm run key`的方式运行。有一些固定的key可以省略run。例如start，build，test等
9. dependencies：指定无论是开发环境还是生产环境我们都需要依赖的包
10. devDependencies：指定在生产环境不需要依赖的包
11. engines：用于指定node和npm的版本，在安装的过程中，会先检查对应的引擎版本，不符合则报错
12. browserslist：用于配置打包后的js代码兼容浏览器的情况

##### `版本管理`

通常我们安装的包的依赖版本都会出现~1.2.3或^1.2.3他的规范主要是X.Y.Z：

1. X：主版本号，当做了不兼容的API的修改时，需要修改这个值
2. Y：次版本号，当做了向下兼容，且有新功能新增时，需要修改这个值
3. Z：修订号：没有新功能，修复了之前的版本的bug时需要修改

^表示X是不变的，y和z永远安装最新的版本

~表示y和x保持不变，z永远安装最新的版本

##### `npm install原理`

![image-20221101223841501](./node.assets/image-20221101223841501.png)

`解析`

检测是有否package-lock.json文件： 

1. 没有lock文件
   1. 分析依赖关系，这是因为我们可能包会依赖其他的包，并且多个包之间会产生相同依赖的情况；
   2.  从registry仓库中下载压缩包（如果我们设置了镜像，那么会从镜像服务器下载压缩包）； 
   3. 获取到压缩包后会对压缩包进行缓存（从npm5开始有的）； 
   4. 将压缩包解压到项目的node_modules文件夹中。然后生成package-lock.json文件
2. 有lock文件 
   1. 检测lock中包的版本是否和package.json中一致（会按照semver版本规范检测）； 
      1. 不一致，那么会重新构建依赖关系，直接会走顶层的流程；
   2. 一致的情况下，会去优先查找缓存 
      1. 没有找到，会从registry仓库下载，直接走顶层流程； 
   3. 查找到，会获取缓存中的压缩文件，并且将压缩文件解压到node_modules文件夹中；

##### `package-lock.json文件解析`

1. name：项目的名称
2. version：项目的版本
3. lockfileVersion：lock文件的版本
4. requires：使用requires来管理模块的依赖关系
5. devDependencies：项目的依赖
6. resolved：在registry仓库的下载地址
7. integrity：从缓存中获取索引，在通过索引去获取压缩文件，最后解压到当前项目的node_modules。终端输入`npm config get cache`就能查看到缓存路径，然后找这个文件
8. ![image-20221102213909688](./node.assets/image-20221102213909688.png)