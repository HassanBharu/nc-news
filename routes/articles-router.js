const articleRouter = require('express').Router()
const { getAllArticles } = require('../controllers/article-controller')

articleRouter
    .route('/')
    .get(getAllArticles)

module.exports = articleRouter;