const {
  create,
  getMomentById,
  getMomentList,
  update,
  remove,
  hasLabel,
  addLabel,
  getFileByFilename
} = require('../service/moment.service')
const fs = require('fs')
const {PICTURE_PATH} = require('../constants/file-path')

class MomentController {
  async create(ctx, next) {
    const userId = ctx.user.id
    const content = ctx.request.body.content
    const result = await create(userId, content)
    ctx.body = result
  }

  async momentDetail(ctx, next) {
    const {momentId} = ctx.params
    const result = await getMomentById(momentId)
    ctx.body = result
  }

  async momentList(ctx, next) {
    const {offset, size} = ctx.query
    const result = await getMomentList(offset, size)
    ctx.body = result
  }

  async update(ctx, next) {
    const {momentId} = ctx.params
    const {content} = ctx.request.body
    const result = await update(momentId, content)
    ctx.body = result
  }

  async remove(ctx, next) {
    const {momentId} = ctx.params
    const result = await remove(momentId)
    ctx.body = result
  }

  async addLabels(ctx, next) {
    const {labels} = ctx
    const {momentId} = ctx.params
    for (const label of labels) {
      const isExist = await hasLabel(momentId, label.id)
      if (!isExist) {
        await addLabel(momentId, label.id)
      }
    }
    ctx.body = '动态标签创建成功~'
  }

  async fileInfo(ctx, next) {
    let {filename} = ctx.params;
    const fileInfo = await getFileByFilename(filename);
    const {type} = ctx.query;
    const types = ["small", "middle", "large"];
    if (types.some(item => item === type)) {
      filename = filename + '-' + type;
    }

    ctx.response.set('content-type', fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }

}

module.exports = new MomentController()
