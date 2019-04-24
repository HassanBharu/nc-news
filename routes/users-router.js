const usersRouter = require('express').Router()
const { getUserByID } = require('../controllers/user-controller')

usersRouter
    .route('/:username')
    .get(getUserByID)

module.exports = usersRouter