const connection = require('../db/connection')


exports.fetchAllArticles = ({ author, topic, sort_by = 'created_at', order = 'desc', limit = 10, p = 1 }) => {
    return connection
        .select('articles.*')
        .from('articles')
        .count('articles')
        .leftJoin('comments', 'comments.article_id', 'articles.article_id')
        .groupBy('articles.article_id')
        .count('comments.comment_id AS comment_count')
        .modify(query => {
            if (author) query.where('articles.author', '=', author)
            if (topic) query.where({ topic })
        })
        .orderBy(sort_by, order)
        .limit(limit)
        .offset((p - 1) * limit)

}

exports.fetchArticlesById = ({ article_id }) => {
    return connection
        .select('articles.*')
        .from('articles')
        .leftJoin('comments', 'comments.article_id', 'articles.article_id')
        .groupBy('articles.article_id')
        .count('comments.comment_id AS comment_count')

        .where('articles.article_id', '=', article_id)
}


exports.updateArticleById = ({ inc_votes, article_id }) => {
    return connection('articles')
        .where('article_id', '=', article_id)
        .increment('votes', +inc_votes)
        .returning('*')
}

exports.fetchArticleComments = ({ article_id, sort_by, order = 'desc', limit = 10, p = 1 }) => {
    return connection
        .select('comment_id', 'comments.votes', 'comments.created_at', 'comments.author', 'comments.body')
        .from('articles')
        .leftJoin('comments', 'comments.article_id', 'articles.article_id')
        .where('articles.article_id', '=', article_id)
        .orderBy(sort_by || 'created_at', order)
        .returning('*')
        .limit(limit)
        .offset((p - 1) * limit)
}

exports.addComment = ({ username, body, article_id }) => {
    const obj = {
        author: username,
        body: body,
        article_id: article_id
    }

    return connection('comments')
        .insert([obj])
        .returning('*')
}

exports.addNewArticle = ({ body, author, topic, title }) => {


    let addObj = {
        author,
        body,
        topic,
        title
    }


    return connection('articles')
        .insert([addObj])
        .returning('*')


}

exports.removeArticle = ({ article_id }) => {
    console.log(article_id)


    return connection('articles')
        .where({ article_id })
        .returning('*')
        .del()
}