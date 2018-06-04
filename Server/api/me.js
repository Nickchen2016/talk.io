const apiRouter = require('express').Router();
const Users = require('../db').Users;
const Contact = require('../db').Contact;

apiRouter.get('/', (req,res,next)=>{
    res.json(req.user || {});
})

apiRouter.put('/', (req,res,next)=>{
    Users.findOne({
        where: req.body
    })
    .then((result)=>{
        req.session.currentlyLoggedUserId = result.id;
        res.status(201).json(result)
        // console.log("++++++++++++++",result.id)
    })
    .catch(next)
})

apiRouter.post('/', (req,res,next)=>{
    Users.create(req.body)
    .then(result => {
        req.session.currentlyLoggedUserId = result.id;
        res.status(201).json(result)})
    .catch(next);
})

module.exports = apiRouter;