const {create, getLabelList} = require('../service/label.service')

class LabelController {
  async create(ctx, next) {
    const {name} = ctx.request.body
    const result = await create(name)
    ctx.body = result
  }

  async list(ctx, next) {
    const {limit, offset} = ctx.query
    const result = await getLabelList(limit, offset)
    ctx.body = result
  }

}

module.exports = new LabelController()
