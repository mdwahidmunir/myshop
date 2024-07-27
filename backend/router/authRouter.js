const express = require('express')
const { signup, login, exampleProtectedPath, exampleAdminPath } = require('../controller/authController')
const { protectedRoute, isAdmin } = require('../middlewares/authMiddlewares')
const passport = require('passport')


const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.get('/exampleAdminPath', protectedRoute, isAdmin, exampleAdminPath)
authRouter.get('/exampleProtectedPath', passport.authenticate('jwt', { session: false }), exampleProtectedPath)
authRouter.get('/exampleProtectedPath2', protectedRoute, exampleProtectedPath)

module.exports = authRouter