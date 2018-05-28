const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost/talk');

 
module.exports = db;