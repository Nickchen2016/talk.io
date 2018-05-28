const Sequelize = require('sequelize');
const db = require('./just-the-db');

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
})

module.exports = User;