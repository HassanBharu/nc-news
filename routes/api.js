const apiRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const articleRouter = require('../routes/articles-router')
const topicRouter = require('../routes/topic-router')
const commentRouter = require('../routes/comments-router')
const usersRouter = require('../routes/users-router')

apiRouter
  .route('/api')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

apiRouter.use('/articles', articleRouter)
apiRouter.use('/topics', topicRouter)
apiRouter.use('/comments', commentRouter)
apiRouter.use('/users', usersRouter)

module.exports = apiRouter;
