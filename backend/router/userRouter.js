const { getUsers, createUser, getUserById, updateUser, getUser } = require('../controller/userController')
const passport = require('passport')
const express = require('express')

const userRouter = express.Router()

userRouter
    .get('/user', passport.authenticate('jwt', { session: false }), getUser)
    .patch('/user', passport.authenticate('jwt', { session: false }), updateUser)

userRouter
    .get('/', getUsers)
    .post('/', createUser);

userRouter
    .get('/:id', getUserById)



module.exports = userRouter