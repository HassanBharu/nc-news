const { fetchUserById, fetchUserArticles } = require('../models/user-model')

exports.getUserByID = (req, res, next) => {

    fetchUserById(req.params)
        .then(([user]) => {
            if (user !== undefined) {
                res.status(200).send({ user })
            } else return Promise.reject({ status: 404, msg: 'invalid username' })
        }).catch(next)
}

exports.userArticles = (req, res, next) => {
    const { username } = req.params
    fetchUserArticles(username)
        .then(articles => {
            res.status(200).send({ articles })
        })
}