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

