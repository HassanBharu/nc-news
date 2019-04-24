const articleRouter = require('express').Router()
const { getAllArticles, getArticleById, patchArticleById, getAllArticleComments, postComment } = require('../controllers/article-controller')

articleRouter
    .route('/')
    .get(getAllArticles)


articleRouter
    .route('/:article_id')
    .get(getArticleById)

articleRouter
    .route('/:article_id')
    .patch(patchArticleById)

articleRouter
    .route('/:article_id/comments')
    .get(getAllArticleComments)

articleRouter
    .route('/:article_id/comments')
    .post(postComment)


module.exports = articleRouter;