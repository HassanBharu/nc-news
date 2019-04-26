const articleRouter = require('express').Router()
const { getAllArticles, getArticleById, patchArticleById, getAllArticleComments, postComment } = require('../controllers/article-controller')
const { methodNotAllowed } = require('../errors/index')

articleRouter
    .route('/')
    .get(getAllArticles)
    .all(methodNotAllowed)

articleRouter
    .route('/:article_id')
    .get(getArticleById)
    .patch(patchArticleById)
    .all(methodNotAllowed)

articleRouter
    .route('/:article_id/comments')
    .get(getAllArticleComments)
    .post(postComment)
    .all(methodNotAllowed)


module.exports = articleRouter;