const connection = require('../db/connection')


exports.fetchAllArticles = ({ author, topic, sort_by, order = 'desc' }) => {
    return connection
        .select('articles.*')
        .from('articles')
        .leftJoin('comments', 'comments.article_id', 'articles.article_id')
        .groupBy('articles.article_id')
        .count('comments.comment_id AS comment_count')
        .modify(query => {
            if (author) query.where('articles.author', '=', author)
            if (topic) query.where({ topic })
        })
        .orderBy(sort_by || 'created_at', order)
}

exports.fetchArticlesById = ({ article_id }) => {
    return connection('articles')
        .where('article_id', '=', article_id)
}

exports.updateArticleById = ({ inc_votes, article_id }) => {
    return connection('articles')
        .where('article_id', '=', article_id)
        .increment('votes', +inc_votes)
        .returning('*')
}

exports.fetchArticleComments = ({ article_id, sort_by, order = 'desc' }) => {
    return connection
        .select('comment_id', 'comments.votes', 'comments.created_at', 'comments.author', 'comments.body')
        .from('articles')
        .leftJoin('comments', 'comments.article_id', 'articles.article_id')
        .where('articles.article_id', '=', article_id)
        .orderBy(sort_by || 'created_at', order)
        .returning('*')
}

exports.addArticle = ({ username, body, article_id }) => {
    const obj = {
        username: username,
        body: body,
        article_id: article_id
    }

    return connection('comments')
        .insert([obj])
        .returning('*')
}