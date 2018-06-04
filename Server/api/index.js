const express = require('express');
const apiRouter = express.Router();

// const db = require('../db').db;

apiRouter.use('/users', require('./users'));
apiRouter.use('/contact', require('./contact'));
apiRouter.use('/me', require('./me'));

module.exports = apiRouter;