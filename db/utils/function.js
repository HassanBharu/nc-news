// what data do we want manipulated?

// articles table - 
// 1. automatically creates a article_id as primary key
//2. title will be a normal insert'
// 3. body will be a normal insert
// 4. votes normal insert
// 5. topic needs to reference the topic primary key from the topics table


function formatArticleData(article, topic, user) {

    let formattedArticle = []

    if (article.length !== 0) {
        for (let i = 0; i < article.length; i++) {
            let newArticle = { ...article[i] }

            let newTopic = topic.find(element =>
                element.slug === newArticle.topic

            )
            delete newArticle.topic
            delete newArticle.created_at

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

/*  let finalFormatComment = []
 
 for (let i = 0; i < formattedComment.length; i++) {
     let finalComment = { ...formattedComment[i] }
 
     let newUser = user.find(element =>
 
         element.username === finalComment.created_by
 
     )
     console.log(finalComment)
 
     delete finalComment.created_by
     delete finalComment.created_at
     //  console.log(newUser)
     finalComment.author = newUser.username
     finalFormatComment.push(finalComment)
 
 }
 
 console.log(finalFormatComment)
 
 
 return finalFormatComment
*/






module.exports = { formatArticleData, formatCommentData }; 