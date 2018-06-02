const express = require('express');
const volleyball = require('volleyball');
const path = require('path');
const app = express();
const db = require('./db/index').db;
const PORT = 8080;


app.use(volleyball);

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api'));

app.use((err,req,res,next)=>{
    console.error('there is a problem');
    console.error(err);
    res.status(err.status || 500).send(err.message);
});


db.sync({force: false})
.then(()=>{
    console.log('db is connected');
    app.listen(PORT, ()=>{
        console.log(`Listening on port ${PORT}`);
    });
})
.catch(err=>{
    console.log(err);
})