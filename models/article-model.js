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
