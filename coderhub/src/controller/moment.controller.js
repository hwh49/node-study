const {create, getMomentById, getMomentList, update, remove, hasLabel, addLabel} = require('../service/moment.service')

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


}

module.exports = new MomentController()
