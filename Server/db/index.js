const db = require('./just-the-db')
const User = require('./user');
const Contact = require('./contact');


Contact.belongsTo(User);
User.hasMany(Contact);
 
module.exports = {
    db,
    User,
    Contact
};