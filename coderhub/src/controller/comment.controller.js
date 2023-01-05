const {create, reply, update, remove, getCommentByMomentId} = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const {momentId, content} = ctx.request.body
    const {id} = ctx.user
    const result = await create(momentId, content, id)
    ctx.body = result
  }

  async reply(ctx, next) {
    const {momentId, content} = ctx.request.body
    const {id} = ctx.user
    const {commentId} = ctx.params
    const result = await reply(momentId, content, id, commentId)
    ctx.body = result
  }

  async update(ctx, next) {
    const {commentId} = ctx.params
    const {content} = ctx.request.body
    const result = await update(commentId, content)
    ctx.body = result
  }

  async remove(ctx, next) {
    const {commentId} = ctx.params
    const result = await remove(commentId)
    ctx.body = result
  }

  async list(ctx, next) {
    const {momentId} = ctx.query
    const result = await getCommentByMomentId(momentId)
    ctx.body = result
  }

}

module.exports = new CommentController()
