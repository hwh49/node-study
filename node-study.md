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

### `COmmonJS`

commonJS是一个规范，最早是提出来在浏览器以外的地方使用的。后来再node上也对CommonJS进行了支持和实现。让我们在开发node的过程中，可以更方便的进行模块化开发

在node中，每个js文件都是单独的一个模块，这个模块中包括CommonJS的核心变量：`exports`，`module.exports`，`require`。我们可以使用这些变量方便的进行开发、

`exports和module.exports`：可以对模块中的内容进行导出，实际上导出的是module.exports。在node源码里`module.exports = exports`。所以默认他们是相等的

`require`：导入其他模块中的内容

所谓的导出就是：exports默认是一个空对象，而上面保存的是这个空对象的引用地址。当我们`require`导入这个文件的时候，返回的就是`exports`的引用地址。