const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const productRouter = require('./router/productRouter');
const userRouter = require('./router/userRouter')
const authRouter = require('./router/authRouter')
const shippingRouter = require('./router/shippingRouter')
const ordersRouter = require('./router/ordersRouter')
const cors = require('cors');
const helmet = require('helmet')
const passport = require('passport')
require('./configs/passport')(passport)

dotenv.config()
const { MONGO_URI: dbURL, FRONTEND_URL, FRONTEND_PORT } = process.env

mongoose.connect(dbURL).then((conn) => {
    console.log("MongoDB successfully connected...");
}).catch(err => {
    console.log("Encountered error while connecting to Mongo DB with error :", err);
})

const app = express();

const origin = `${FRONTEND_URL}` === 'http://localhost' ? `${FRONTEND_URL}:${FRONTEND_PORT}` : `${FRONTEND_URL}`
const corsOptions = {
    origin: origin,
    credentials: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
}

app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(cookieParser())
app.use(passport.initialize())

app.use('/api/v1/products', productRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/shipping', shippingRouter)
app.use('/api/v1/orders', ordersRouter)

const PORT = process.env.PORT || 8080;
app.get('/api/v1/serverCheck', (req, res) => {
    const cookie = req.cookies.jwt || 'NO_COOKIE'
    res.status(200).json({
        status: "success",
        response: `Frontend origin is ${origin} || backend is running on port ${PORT} ccokies : ${cookie}`
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})