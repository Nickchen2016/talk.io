const express = require('express');
const app = express();
const PORT = 8080;

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

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});
