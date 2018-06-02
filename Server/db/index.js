const db = require('./just-the-db')
const Users = require('./users');
const Contact = require('./contact');


Contact.belongsTo(Users);
Users.hasMany(Contact);
 
module.exports = {
    db,
    Users,
    Contact
};