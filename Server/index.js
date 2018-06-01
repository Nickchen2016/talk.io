const express = require('express');
const volleyball = require('volleyball');
const path = require('path');
const app = express();
const db = require('./db/index');
const PORT = 8080;


app.use(volleyball);

app.use(express.static(path.join(__dirname, '../public')));

// app.use('/api', require('./api'));

app.get('/', (req,res,next)=>{
    res.send(`
    <html>
     <head>
       <title>My site</title>
     </head>
     <body>
       <h1>Hello World</h1>
     </body>
    </html>
  `)
})


db.sync({force: true})
.then(()=>{
    console.log('db is connected');
    app.listen(PORT, ()=>{
        console.log(`Listening on port ${PORT}`);
    });
})
.catch(err=>{
    console.log(err);
})