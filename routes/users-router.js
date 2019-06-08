const usersRouter = require('express').Router()
const { getUserByID, userArticles, allUsers } = require('../controllers/user-controller')

usersRouter
    .route('/')
    .get(allUsers)

usersRouter
    .route('/:username')
    .get(getUserByID)

usersRouter
    .route('/:username/articles')
    .get(userArticles)

module.exports = usersRouter