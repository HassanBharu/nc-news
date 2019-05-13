const { fetchUserById } = require('../models/user-model')

exports.getUserByID = (req, res, next) => {

    fetchUserById(req.params)
        .then(([user]) => {
            if (user !== undefined) {
                res.status(200).send({ user })
            } else return Promise.reject({ status: 404, msg: 'invalid username' })
        }).catch(next)
}