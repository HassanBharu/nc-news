const { fetchUserById } = require('../models/user-model')

exports.getUserByID = (req, res, next) => {

    fetchUserById(req.params)
        .then(user => {
            res.status(200).send({ user })
        })
}