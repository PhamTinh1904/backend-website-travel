const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const corsOptions ={
    origin: true,
    credentials: true
}
// init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));


// init database

require('./dbs/init.mongodb')

// init routes
app.use('/', require('./routes'))

// handling errors  

module.exports = app