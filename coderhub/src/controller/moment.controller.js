const {create, getMomentById, getMomentList} = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    const userId = ctx.user.id
    const content = ctx.request.body.content
    const result = await create(userId, content)
    ctx.body = result
  }

  async momentDetail(ctx, next) {
    const momentId = ctx.params.momentId
    const result = await getMomentById(momentId)
    ctx.body = result
  }

  async momentList(ctx, next) {
    const {offset, size} = ctx.query
    const result = await getMomentList(offset, size)
    ctx.body = result
  }
}

module.exports = new MomentController()
