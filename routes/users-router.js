const usersRouter = require('express').Router()
const { getUserByID, userArticles } = require('../controllers/user-controller')

usersRouter
    .route('/:username')
    .get(getUserByID)

usersRouter
    .route('/:username/articles')
    .get(userArticles)

module.exports = usersRouter