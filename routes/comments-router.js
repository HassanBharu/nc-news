const commentRouter = require('express').Router()
const { patchComment, getAllComments, deleteComment } = require('../controllers/comment-controller')
const { methodNotAllowed } = require('../errors/index')

commentRouter
    .route('/')
    .get(getAllComments)
    .all(methodNotAllowed)

commentRouter
    .route('/:comment_id')
    .delete(deleteComment)
    .patch(patchComment)
    .all(methodNotAllowed)

module.exports = commentRouter;