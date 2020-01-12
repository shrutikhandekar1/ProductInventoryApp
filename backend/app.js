const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('./models/http-error');
const mongoose = require('mongoose');
var cors = require('CORS');
const dotenv = require('dotenv').config();

const productRoutes = require('./routes/product-routes');

const app = express();

const MongoURI = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/products', productRoutes);

app.use((req,res,next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
})

app.use((error, req, res, next) => {
    if(res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occured!'});
})

app.use((error, req, res, next) => {
    if(res.headerSent)
        return next(error)
    res.status(error.code || 500)
    res.json({message:error.message || 'An unknown error occured'});
})


mongoose.connect(MongoURI).
then(() => {app.listen(port)}).
catch(err => { console.log(err)});
