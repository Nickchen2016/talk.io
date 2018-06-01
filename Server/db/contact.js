const Sequelize = require('sequelize');
const db = require('./just-the-db');

const Contact = db.define('contact', {
    color: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    }
})

module.exports = Contact;