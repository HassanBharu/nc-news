const { fetchAllArticles, fetchArticlesById, updateArticleById, fetchArticleComments, addComment } = require('../models/article-model')

exports.getAllArticles = (req, res, next) => {
    fetchAllArticles(req.query)
        .then(articles => {
            res.status(200).send({ articles })
        })
}

exports.getArticleById = (req, res, next) => {
    fetchArticlesById(req.params)
        .then(article => {
            res.status(200).send({ article })
        })
}

exports.patchArticleById = (req, res, next) => {
    updateArticleById({ ...req.body, ...req.params })
        .then(article => {
            res.status(200).send({ article })
        })
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
