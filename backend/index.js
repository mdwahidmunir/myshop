const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const productRouter = require('./router/productRouter');
const userRouter = require('./router/userRouter')
const authRouter = require('./router/authRouter')
const cors = require('cors');
const helmet = require('helmet')
const passport = require('passport')
require('./configs/passport')(passport)

dotenv.config()
const { MONGO_URI: dbURL } = process.env

mongoose.connect(dbURL).then((conn) => {
    console.log("MongoDB successfully connected...");
}).catch(err => {
    console.log("Encountered error while connecting to Mongo DB with error :", err);
})

const app = express();

app.use(helmet())
app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser())
app.use(passport.initialize())

app.use('/api/v1/products', productRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})