const apiRouter = require('express').Router();
const Users = require('../db').Users;
const Contact = require('../db').Contact;


apiRouter.get('/', (req,res,next)=>{
    Users.findAll({
        attributes:['id','name','email','color','status'],
        include:[{model: Contact}]
    })
    .then((result)=>{
        res.send(result)
    })
    .catch(next)
})

apiRouter.get('/:id', (req,res,next)=>{
    Users.findByPk(
        req.params.id,
        {attributes:['name','email','status']
    })
    .then(result=>{
        res.status(201).json(result)
    })
    .catch(next)
})

apiRouter.put('/', (req,res,next)=>{
    Users.findOne({
        where: req.body,
        attributes:['id','name','email','color','status']
    })
    .then((result)=>{
        res.status(201).json(result)
    })
    .catch(next)
})

apiRouter.put('/:id', (req,res,next)=>{
    Users.findByPk(req.params.id)
    .then(result => {
        if(result){
            result.update(req.body)
                .then(result => res.status(201).send(result))
                .catch(next)
        }
    })
})

apiRouter.post('/', (req,res,next)=>{
    Users.create(req.body)
    .then(result => res.status(201).json(result))
    .catch(next);
})

module.exports = apiRouter;