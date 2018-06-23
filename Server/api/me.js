const apiRouter = require('express').Router();
const Users = require('../db').Users;
const Contact = require('../db').Contact;

apiRouter.get('/', (req,res,next)=>{
    res.json(req.user || {});
})

apiRouter.put('/', (req,res,next)=>{
    Users.findOne({
        where: req.body,
        include:[{model: Contact}]
    })
    .then((result)=>{
        req.login(result, (err)=>{
            if(err) next(err);
            else res.json(result);
            })
    })
    .catch(next)
})

apiRouter.post('/', (req,res,next)=>{
    Users.create(req.body, {include:[{model: Contact}]})
    .then(result => {
        req.login(result, (err)=>{
            if(err) next(err);
            else res.json(result);
        })
    })
    .catch(next);
})

apiRouter.delete('/', (req,res,next)=>{
    req.logout();
    res.sendStatus(204);
})

module.exports = apiRouter;