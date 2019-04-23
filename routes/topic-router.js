const topicRouter = require('express').Router()
const { getAllTopics } = require('../controllers/topic-controller')

topicRouter
    .route('/')
    .get(getAllTopics)

module.exports = topicRouter;