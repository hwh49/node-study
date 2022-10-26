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