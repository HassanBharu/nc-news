const { updateComment, removeComment, fetchAllComments } = require('../models/comment-model')

exports.patchComment = (req, res, next) => {
    updateComment({ ...req.body, ...req.params })
        .then(comment => {
            res.status(200).send({ comment })
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
            res.status(204).send({ comment })
        }).catch(next)
}