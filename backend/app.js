const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const errorMiddleware = require('./middleware/err.js');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routes imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);

//middleware for errors
app.use(errorMiddleware);

module.exports = app;