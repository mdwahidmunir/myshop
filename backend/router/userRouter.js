const { getUsers, createUser, getUserById, updateUserById } = require('../controller/userController')
const express = require('express')

const userRouter = express.Router()

userRouter
    .get('/', getUsers)
    .post('/', createUser);

userRouter
    .get('/:id', getUserById)
    .patch('/:id', updateUserById)

module.exports = userRouter