const express = require('express')
const { signup, login, exampleProtectedPath, exampleAdminPath } = require('../controller/authController')
const { protectedRoute, isAdmin } = require('../middlewares/authMiddlewares')

const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.get('/exampleProtectedPath', protectedRoute, exampleProtectedPath)
authRouter.get('/exampleAdminPath', protectedRoute, isAdmin, exampleAdminPath)

module.exports = authRouter