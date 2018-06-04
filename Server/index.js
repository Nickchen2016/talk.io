const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('./db/index').db;
const expressSession = require('express-session');
const PORT = 8080;


app.use(volleyball);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//session
const sessionMiddleware = expressSession({
    secret: 'talk.io',
    resave: true,
    saveUninitialized: true
})
app.use(sessionMiddleware);
//assign req.session to any downstream middleware 
app.get('/', (req,res,next)=>{
    if(req.session.counter === undefined){
        req.session.counter = 0;
    }else{
        req.session.counter++;
    }
    next();
})
app.use(function(req,res,next){
    console.log('session',req.session);
    next();
})


app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_module')));

app.use('/api', require('./api'));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }); // Send index.html for any other requests

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