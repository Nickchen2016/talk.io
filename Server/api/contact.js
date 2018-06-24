const apiRouter = require('express').Router();
const Contact =require('../db').Contact;

apiRouter.get('/', (req,res,next)=>{
    Contact.findAll()
    .then((result)=>{
        res.send(result)
    })
    .then(next)
});

apiRouter.post('/', (req,res,next)=>{
    Contact.create(req.body)
    .then(result => res.status(201).json(result))
    .catch(next);
})

apiRouter.delete('/:id', (req,res,next)=>{
    Contact.destroy({
        where: {id: req.params.id}
    }).then( result => res.json(result))
    .catch(next)
})

module.exports = apiRouter;