\c nc_news_test

SELECT articles.article_id, articles.votes, title,articles.author, COUNT(comments.comment_id) FROM articles
LEFT JOIN comments on comments.article_id = articles.article_id
GROUP BY articles.article_id

