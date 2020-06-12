const apiRouter = require('express').Router();
const Contact =require('../db').Contact;

apiRouter.get('/', (req,res,next)=>{
    Contact.findAll()
    .then(result=>{
        res.json(result)
    })
    .then(next)
});

// apiRouter.put('/:id', (req,res,next)=>{
//     Contact.findByPk(req.params.id)
//     .then(result => {
//         if(result){
//             result.update(req.body)
//                 .then(result => res.status(201).send(result))
//                 .catch(next)
//         }
//     })
// })

apiRouter.put('/', (req,res,next)=>{
    Contact.update({
        status:req.body.status
    },{
        where: { ownId: req.body.ownId }
    })
    .then(result => res.status(201).json(result))
    .catch(next)
})

// apiRouter.put('/', (req,res,next)=>{
//     Contact.findAll({
//         where: {
//             ownId:req.body.ownId
//         }
//     })
//     .then(result=>{
//         if(result) {
//             result.map(c => c.update({status:req.body.status}).success(result =>res.status(201).send(result)).error(err))
//             .success(result =>res.status(201).send(result))
//         }else{
//             res.status(404).end()}
//     })
//     .then(result =>res.status(201).send(result))
//     .catch(next)
// });

// apiRouter.put('/', (req,res,next)=>{
//     Contact.findOne({
//         where: req.body,
//         attributes:['ownId']
//     })
//     .then((result)=>{
//         res.status(201).json(result)
//     })
//     .catch(next)
// })

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