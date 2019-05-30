const articleRouter = require('express').Router()
const { getAllArticles, getArticleById, patchArticleById, getAllArticleComments, postComment, postArticle, deleteArticle } = require('../controllers/article-controller')
const { methodNotAllowed } = require('../errors/index')

articleRouter
    .route('/')
    .get(getAllArticles)
    .post(postArticle)
    .all(methodNotAllowed)

articleRouter
    .route('/:article_id')
    .get(getArticleById)
    .patch(patchArticleById)
    .delete(deleteArticle)
    .all(methodNotAllowed)

articleRouter
    .route('/:article_id/comments')
    .get(getAllArticleComments)
    .post(postComment)
    .all(methodNotAllowed)


module.exports = articleRouter;