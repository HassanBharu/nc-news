const commentRouter = require('express').Router()
const { patchComment, getAllComments, deleteComment } = require('../controllers/comment-controller')

commentRouter
    .route('/')
    .get(getAllComments)

commentRouter
    .route('/:comment_id')
    .delete(deleteComment)

commentRouter
    .route('/:comment_id')
    .patch(patchComment)

module.exports = commentRouter;