const express = require('express')
const { signup, login, sendOTP, exampleProtectedPath, exampleAdminPath, passwordReset, logout } = require('../controller/authController')
const { protectedRoute, isAdmin } = require('../middlewares/authMiddlewares')
const passport = require('passport')


const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/sendOtp', sendOTP)
authRouter.post('/passwordReset', passwordReset)
authRouter.get('/exampleAdminPath', protectedRoute, isAdmin, exampleAdminPath)
authRouter.get('/exampleProtectedPath', passport.authenticate('jwt', { session: false }), exampleProtectedPath)
authRouter.get('/exampleProtectedPath2', protectedRoute, exampleProtectedPath)

module.exports = authRouter