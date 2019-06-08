const { fetchUserById, fetchUserArticles, fetchAllUsers } = require('../models/user-model')

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

exports.allUsers = (req, res, next) => {
    fetchAllUsers()
        .then(users => {
            res.status(200).send({ users })
        })
}