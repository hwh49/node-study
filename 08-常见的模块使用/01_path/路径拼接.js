const path = require("path");
const dirname = '/user/node'
const filename = 'abc.txt'

const filePath = path.resolve(dirname, filename)
console.log(filePath)
