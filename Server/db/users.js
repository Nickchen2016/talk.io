const Sequelize = require('sequelize');
const db = require('./just-the-db');

const Users = db.define('user', {
    color: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            isEmail: true,
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    googleProfileId: Sequelize.STRING
})

module.exports = Users;