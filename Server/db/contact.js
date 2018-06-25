const Sequelize = require('sequelize');
const db = require('./just-the-db');

const Contact = db.define('contact', {
    ownId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
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
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

module.exports = Contact;