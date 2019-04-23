const articleRouter = require('express').Router()
const { getAllArticles, getArticleById, patchArticleById } = require('../controllers/article-controller')

articleRouter
    .route('/')
    .get(getAllArticles)


articleRouter
    .route('/:article_id')
    .get(getArticleById)

articleRouter
    .route('/:article_id')
    .patch(patchArticleById)


module.exports = articleRouter;