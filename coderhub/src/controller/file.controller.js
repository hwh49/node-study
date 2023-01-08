const Jimp = require('jimp')
const path = require('path')
const {createAvatar, createFile} = require('../service/file.service')
const {APP_HOST, APP_PORT} = require('../app/config')
const {updateAvatarUrl} = require('../service/user.service')


class FileController {
  async saveAvatarInfo(ctx, next) {
    // 1.获取图像信息
    const {mimetype, filename, size} = ctx.req.file
    const {id} = ctx.user
    console.log(filename, mimetype, size, id)
    // 2.保存图像信息
    const result = await createAvatar(filename, mimetype, size, id)

    // 3.将头像地址保存到user中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    await updateAvatarUrl(avatarUrl, id)
    ctx.body = '上传成功~'
  }

  async savePictureInfo(ctx, next) {
    // 1.获取图像信息
    const files = ctx.req.files;
    const {id} = ctx.user
    const {momentId} = ctx.query
    // 2. 将所有的文件信息保存到数据库中
    for (const file of files) {
      const {filename, mimetype, size} = file
      await createFile(filename, mimetype, size, id, momentId)
    }

    ctx.body = '动态上传完成'
  }

}

module.exports = new FileController()
