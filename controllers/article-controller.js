const { fetchAllArticles } = require('../models/article-model')

exports.getAllArticles = (req, res, next) => {
    fetchAllArticles()
        .then(articles => {
            res.status(200).send({ articles })
        }).catch(err => console.log(err))
}