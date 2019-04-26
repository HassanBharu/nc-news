const { updateComment, removeComment, fetchAllComments } = require('../models/comment-model')

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
            res.status(200).send({ comments })
        }).catch(next)
}
exports.deleteComment = (req, res, next) => {
    removeComment(req.params)
        .then(comment => {
            if (comment.length !== 0) {
                console.log(comment)
                res.status(204).send({ comment })
            } else return Promise.reject({ status: 404, msg: 'id does not exist' })
        }).catch(next)
}