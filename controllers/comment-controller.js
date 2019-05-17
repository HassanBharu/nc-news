const { updateComment, removeComment, fetchAllComments, fetchSingleComment } = require('../models/comment-model')

exports.patchComment = (req, res, next) => {
    updateComment({ ...req.body, ...req.params })
        .then(([comment]) => {
            if (comment !== undefined) {
                res.status(200).send({ comment })
            } else return Promise.reject({ status: 404, msg: 'id not found' })
        }).catch(next)
}


exports.getAllComments = (req, res, next) => {
    fetchAllComments()
        .then(comments => {
            console.log(comments)
            res.status(200).send({ comments })
        }).catch(next)
}

exports.getSigleComment = (req, res, next) => {
    fetchSingleComment(req.params)
        .then(comment => {
            res.status(200).send({ comment })
        })
}

exports.deleteComment = (req, res, next) => {
    removeComment(req.params)
        .then(comment => {
            if (comment.length !== 0) {
                res.status(204).send({ comment })
            } else return Promise.reject({ status: 404, msg: 'id does not exist' })
        }).catch(next)
}