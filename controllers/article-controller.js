const { fetchAllArticles, fetchArticlesById, updateArticleById, fetchArticleComments, addComment } = require('../models/article-model')

exports.getAllArticles = (req, res, next) => {
    fetchAllArticles(req.query)
        .then(articles => {
            if (articles.length !== 0) {
                res.status(200).send({ articles })
            }
            else return Promise.reject({ status: 400, msg: "page not found" })
        }).catch(next)
}

exports.getArticleById = (req, res, next) => {
    fetchArticlesById(req.params)
        .then(article => {
            if (article.length !== 0) {
                res.status(200).send({ article })
            } else return Promise.reject({ status: 404, msg: 'id not found' })
        }).catch(console.log)
}

exports.patchArticleById = (req, res, next) => {
    updateArticleById({ ...req.body, ...req.params })
        .then(article => {
            if (article.votes !== Number) {
                res.status(200).send({ article })
            } else return Promise.reject({ status: 400, msg: 'bad request' })
        }).catch(next)
}

exports.getAllArticleComments = (req, res, nex) => {

    fetchArticleComments({ ...req.params, ...req.query })
        .then(comments => {
            res.status(200).send({ comments })
        })
}

exports.postComment = (req, res, next) => {
    addComment({ ...req.body, ...req.params })
        .then(comment => {
            res.status(201).send({ comment })
        })
}
