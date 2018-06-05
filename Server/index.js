const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('./db/index').db;
const session = require('express-session');
const { Users } = require('./db/index');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const rgb = ['rgb(255,102,102)','rgb(237,28,36)','rgb(255,242,0)','rgb(255,204,51)','rgb(255,102,255)','rgb(0,102,255)','rgb(0,0,204)','rgb(102,255,0)','rgb(102,255,153)','rgb(196,154,108)','rgb(153,102,255)','rgb(102,51,255)','rgb(102,0,153)','rgb(139,94,60)','rgb(188,190,192)'];
const index = Math.floor(Math.random()*15);

const PORT = 8080;



app.use(volleyball);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//session
app.use(session({
    secret: 'talk.io',
    resave: true,
    saveUninitialized: true
}));
//assign req.session to any downstream middleware 
app.get('/', (req,res,next)=>{
    if(req.session.counter === undefined){
        req.session.counter = 0;
    }else{
        req.session.counter++;
    }
    next();
})

//==========//
// Passport //
//==========//

//config a google strategy (like how you deal with the user profile that google pass down to you)
passport.use(new GoogleStrategy({
    clientID: '917673410222-98ofmtp7hbg1m6l8rdbp6nuhdriobepl.apps.googleusercontent.com',
    clientSecret: 'sFFd8dofD3yqQ8183FFN6qat',
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done)=>{
    Users.findOne({
      where:{
        googleProfileId: profile.id
      }
    }).then(user =>{
      if(user) return user;
      return Users.create({
        color: rgb[index],
        name: profile.displayName,
        email:profile.emails[0].value,
        password: 'No Password for google client',
        googleProfileId: profile.id
      })
    })
    .then(user=>{
      done(null,user);
    }).catch(done)
  }));
  
  //config user <=> session about passport
  passport.serializeUser(((user, done)=>{
    done(null, user.id)
  }));
  passport.deserializeUser((id,done)=>{
    Users.findById(id)
    .then(user=>{
      done(null, user);
    })
    .catch(done)
  });
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.get('/auth/google', passport.authenticate('google',{ scope: 'email' }));
  app.get('/auth/google/callback', passport.authenticate('google',{
    successRedirect: '/',
    failureRedirect: '/'
  }));
  


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