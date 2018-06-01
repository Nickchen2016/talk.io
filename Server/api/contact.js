const apiRouter = require('express').Router();
const Contact =require('../db').Contact;

apiRouter.get('/', (req,res,next)=>{
    Contact.findAll()
    .then((result)=>{
        res.send(result)
    })
    .then(next)
});

module.exports = apiRouter;