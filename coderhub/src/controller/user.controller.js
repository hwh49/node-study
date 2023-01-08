const fs = require('fs')

const service = require('../service/user.service')
const {getAvatarByUserId} = require('../service/file.service')
const {AVATAR_PATH} = require("../constants/file-path");


class UserController {
  async create(ctx, next) {
    // 获取用户传递的参数
    const user = ctx.request.body;
    // 查询数据
    const result = await service.create(user);

    // 返回数据
    ctx.body = result;
  }

  async avatarInfo(ctx, next) {
    // 1. 获取用户的id
    const {userId} = ctx.params
    const avatarInfo = await getAvatarByUserId(userId)

    // 没有设置response时，浏览器直接访问这个接口会直接把图片下载下来
    ctx.response.set('content-type', avatarInfo.mimeType)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}

module.exports = new UserController();
