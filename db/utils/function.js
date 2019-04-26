function formatArticleData(article, topic, user) {

    let formattedArticle = []

    if (article.length !== 0) {
        for (let i = 0; i < article.length; i++) {
            let newArticle = { ...article[i] }

            let newTopic = topic.find(element =>
                element.slug === newArticle.topic

            )

            newArticle.created_at = new Date(newArticle.created_at)
            delete newArticle.topic
            // delete newArticle.created_at

            newArticle.topic = newTopic.slug
            formattedArticle.push(newArticle)
        }

    }

    let finalFormatArticle = []

    for (let i = 0; i < formattedArticle.length; i++) {
        let finalArticle = { ...formattedArticle[i] }

        let newUser = user.find(element =>
            element.username === finalArticle.author

        )

        delete finalArticle.author
        finalArticle.author = newUser.username
        finalFormatArticle.push(finalArticle)

    }
    return finalFormatArticle

}




function formatCommentData(comments, articles, user) {

    let formattedComment = []

    if (comments.length !== 0) {
        for (let i = 0; i < comments.length; i++) {
            let newComment = { ...comments[i] }
            let newArticle = articles.find(article =>
                newComment.belongs_to === article.title

            )
            delete newComment.belongs_to
            delete newComment.created_by
            delete newComment.created_at
            newComment.article_id = newArticle.article_id
            newComment.author = newArticle.author


            formattedComment.push(newComment)
        }

    }
    return formattedComment
}







module.exports = { formatArticleData, formatCommentData }; 