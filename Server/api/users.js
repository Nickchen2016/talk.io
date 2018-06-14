const apiRouter = require('express').Router();
const Users = require('../db').Users;
const Contact = require('../db').Contact;


apiRouter.get('/', (req,res,next)=>{
    Users.findAll({
        include:[{model: Contact}]
    })
    .then((result)=>{
        res.send(result)
    })
    .catch(next)
})

apiRouter.put('/', (req,res,next)=>{
    Users.findOne({
        where: req.body
    })
    .then((result)=>{
        req.login(result, (err)=>{
            if(err) next(err);
            else res.json(result);
            })
    })
    .catch(next)
})

// apiRouter.post('/', (req,res,next)=>{
//     Users.create(req.body)
//     .then(result => res.status(201).json(result))
//     .catch(next);
// })

module.exports = apiRouter;