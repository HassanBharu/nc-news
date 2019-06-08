const connection = require('../db/connection')

exports.fetchUserById = ({ username }) => {
    return connection
        .select('*')
        .from('users')
        .where('username', '=', username)
        .returning('*')
}

exports.fetchUserArticles = (username) => {
    console.log(username)
    return connection
        .select('*')
        .from('articles')
        .where('articles.author', '=', username)
        .returning('*')
}

exports.fetchAllUsers = () => {
    return connection
        .select('*')
        .from('users')
        .returning('*')
}