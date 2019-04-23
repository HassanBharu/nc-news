const { fetchAllArticles, fetchArticlesById } = require('../models/article-model')

exports.getAllArticles = (req, res, next) => {
    fetchAllArticles(req.query)
        .then(articles => {
            res.status(200).send({ articles })
        })
}

exports.getArticleById = (req, res, next) => {
    console.log(req.body)

    fetchArticlesById(req.params)
        .then(article => {
            res.status(200).send({ article })
        })
}

exports.patchArticleById = (req, res, next) => {
    updateArticleById()
        .then(article => {
            res.status(200).send({ article })
        })
}
