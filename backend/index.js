const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const productRouter = require('./router/ProductRouter');

dotenv.config()
const { MONGO_URI: dbURL } = process.env

mongoose.connect(dbURL).then((conn) => {
    console.log("MongoDB successfully connected...");
}).catch(err => {
    console.log("Encountered error while connecting to Mongo DB with error :", err);
})

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/products', productRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`)
})