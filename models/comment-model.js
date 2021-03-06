const connection = require('../db/connection')


exports.updateComment = ({ inc_votes, comment_id }) => {
    return connection('comments')
        .where({ comment_id })
        .increment('votes', +inc_votes)
        .returning('*')

}

exports.fetchSingleComment = (comment_id) => {
    return connection
        .select('*')
        .from('comments')
        .where({ comment_id })


}

exports.fetchAllComments = () => {
    return connection
        .select('*')
        .from('comments')
}

exports.removeComment = ({ comment_id }) => {
    return connection('comments')
        .where({ comment_id })
        .returning('*')
        .del()
}
