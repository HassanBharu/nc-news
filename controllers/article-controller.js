const { fetchAllArticles, fetchArticlesById, updateArticleById, fetchArticleComments, addComment } = require('../models/article-model')

exports.getAllArticles = (req, res, next) => {
    fetchAllArticles(req.query)
        .then(articles => {
            if (articles.length !== 0) {
                res.status(200).send({ articles })
            }
            else return Promise.reject({ status: 404, msg: "page not found" })
        }).catch(next)
}

exports.getArticleById = (req, res, next) => {
    fetchArticlesById(req.params)
        .then(([article]) => {
            if (article !== undefined) {
                res.status(200).send({ article })
            } else return Promise.reject({ status: 404, msg: 'id not found' })
        }).catch(next)
}

exports.patchArticleById = (req, res, next) => {
    updateArticleById({ ...req.body, ...req.params })
        .then(([article]) => {
            res.status(200).send({ article })
        }).catch(next)
}

exports.getAllArticleComments = (req, res, next) => {

    fetchArticleComments({ ...req.params, ...req.query })
        .then((comments) => {
            if (comments.length !== 0) {
                res.status(200).send({ comments })
            } else return Promise.reject({ status: 400, msg: 'invalid id' })
        }).catch(next)
}

exports.postComment = (req, res, next) => {
    console.log(req.body)
    addComment({ ...req.body, ...req.params })
        .then(([comment]) => {
            console.log(comment)
            res.status(201).send({ comment })
        }).catch(next)
}
