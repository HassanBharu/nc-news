const { fetchAllTopics } = require('../models/topic-model')

exports.getAllTopics = (req, res, next) => {
    fetchAllTopics()
        .then(topics => {
            res.status(200).send({ topics })
        }).catch(next)
}