\c nc_news_test

INSERT INTO comments (body, author, article_id)
VALUES ('', 'icellusedkars', 1)
RETURNING *;