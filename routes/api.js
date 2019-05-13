const apiRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const articleRouter = require('../routes/articles-router')
const topicRouter = require('../routes/topic-router')
const commentRouter = require('../routes/comments-router')
const usersRouter = require('../routes/users-router')
const endpoints = require('../controllers/api-controller')

const getEndPoints = (req, res, next) => {
  res.status(200).send(endpoints);
};

apiRouter
  .route('/')
  .get(getEndPoints)

  .all(methodNotAllowed);



apiRouter.use('/articles', articleRouter)
  .all(methodNotAllowed)
apiRouter.use('/topics', topicRouter)
  .all(methodNotAllowed)
apiRouter.use('/comments', commentRouter)
  .all(methodNotAllowed)
apiRouter.use('/users', usersRouter)
  .all(methodNotAllowed)

module.exports = apiRouter;
