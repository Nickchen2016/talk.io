const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('./db/index').db;
const session = require('express-session');
const { Users, Contact } = require('./db/index');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({db})
const rgb = ['rgb(255,102,102)','rgb(237,28,36)','rgb(255,242,0)','rgb(255,204,51)','rgb(255,102,255)','rgb(0,102,255)','rgb(0,0,204)','rgb(102,255,0)','rgb(102,255,153)','rgb(196,154,108)','rgb(153,102,255)','rgb(102,51,255)','rgb(102,0,153)','rgb(139,94,60)','rgb(188,190,192)'];
const index = Math.floor(Math.random()*15);

const socketio = require('socket.io');
if (process.env.NODE_ENV !== 'production') require('../secrets');

const PORT = process.env.PORT || 8080;



app.use(volleyball);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//session
app.use(session({
    secret: 'talk.io',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
//assign req.session to any downstream middleware 
// app.get('/', (req,res,next)=>{
//     if(req.session.counter === undefined){
//         req.session.counter = 0;
//     }else{
//         req.session.counter++;
//     }
//     next();
// })

//==========//
// Passport //
//==========//

//config a google strategy (like how you deal with the user profile that google pass down to you)
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.')
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }

passport.use(new GoogleStrategy(
    googleConfig,
   (accessToken, refreshToken, profile, done)=>{
    Users.findOne({
      where:{
        googleProfileId: profile.id
      },
        include:[{model: Contact}]
      
    }).then(user =>{
      if(user) return user;
      return Users.create({
        color: rgb[index],
        name: profile.displayName,
        email:profile.emails[0].value,
        status: 'rgb(102,255,153)',
        password: 'No Password for google client',
        googleProfileId: profile.id
      })
    })
    .then(user=>{
      done(null,user);
    }).catch(done)
  }));
  
  //config user <=> session about passport
  passport.serializeUser((user, done)=>{
      done(null, user.id)
  });
  passport.deserializeUser((id,done)=>{
    Users.findByPk(id, {include:[{model: Contact}]})
    .then(user=>{
      done(null, user);
    })
    .catch(done)
  });
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.get('/auth/google', passport.authenticate('google',{ scope: 'email' }));
  app.get('/auth/google/callback', passport.authenticate('google',{
    successRedirect: '/sidebar',
    failureRedirect: '/'
  }));
}


app.use(function(req,res,next){
    console.log('session',req.session);
    next();
})


app.use(express.static(path.join(__dirname, '../Public')));
app.use(express.static(path.join(__dirname, '../node_module')));

app.use('/api', require('./api'));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/index.html'));
  }); // Send index.html for any other requests

app.use((err,req,res,next)=>{
    console.error('there is a problem');
    console.error(err);
    res.status(err.status || 500).send(err.message);
});


db.sync({force: false})
.then(()=>{
    console.log('db is connected');
    const server = app.listen(PORT, ()=>{
        console.log(`Listening on port ${PORT}`);
    });

    const io = socketio(server);
    require('./socket')(io);
})
.catch(err=>{
    console.log(err);
})