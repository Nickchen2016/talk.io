const express = require('express');
const apiRouter = express.Router();

// const db = require('../db').db;

apiRouter.use('/user', require('./user'));
apiRouter.use('/contact', require('./contact'));

module.exports = apiRouter;