const {getLabelByName, create} = require('../service/label.service')

class LabelMiddleware {
  async verifyLabelExist(ctx, next) {
    const {labels} = ctx.request.body
    const newLabels = []
    for (const name of labels) {
      const labelResult = await getLabelByName(name)
      const label = {name}
      if (!labelResult) {
        const result = await create(name)
        label.id = result.id
      } else {
        label.id = labelResult.id
      }
      newLabels.push(label)
    }
    ctx.labels = newLabels
    await next()
  }
}

module.exports = new LabelMiddleware()
