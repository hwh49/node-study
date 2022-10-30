const EventEmmiter = require('events')

// 导入的是一个类，需要实例化
const bus = new EventEmmiter()

function clickHanlde(args) {
  console.log('监听到click事件', args)
}

// 监听事件
bus.on('click', clickHanlde)

setTimeout(() => {
  // 发出事件
  bus.emit('click', 'hwh')

  // 取消事件 取消时，需要传入对应的事件字符串与注册函数
  bus.off('click', clickHanlde)

  bus.emit('click', 'abc')
}, [2000])
