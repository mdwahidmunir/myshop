const { getUsers, createUser, getUserById, updateUserById, getUser } = require('../controller/userController')
const passport = require('passport')
const express = require('express')

const userRouter = express.Router()

userRouter
    .get('/user', passport.authenticate('jwt', { session: false }), getUser)

userRouter
    .get('/', getUsers)
    .post('/', createUser);

userRouter
    .get('/:id', getUserById)
    .patch('/:id', updateUserById)


module.exports = userRouter