const apiRouter = require('express').Router();
const User = require('../db').User;
const Contact = require('../db').Contact;


apiRouter.get('/', (req,res,next)=>{
    User.findAll({
        include:[{model: Contact}]
    })
    .then((result)=>{
        res.send(result)
    })
    .catch(next)
})

module.exports = apiRouter;