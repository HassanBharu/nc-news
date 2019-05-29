\c nc_news


INSERT INTO articles (author,body,topic,title)
VALUES ('jessjelly', 'cool story','cooking','title')
RETURNING *
;
--(SELECT slug from topics where slug = 'cooking')

--select * from topics

