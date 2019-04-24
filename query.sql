\c nc_news_test

SELECT articles.article_id, comment_id, comments.votes, comments.created_at, comments.author, comments.body FROM articles
LEFT JOIN comments ON comments.article_id = articles.article_id
 WHERE articles.article_id = 1;