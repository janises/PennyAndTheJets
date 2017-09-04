require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , session = require('express-session')
    , cors = require('cors')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , app = express()
    , port = 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static(__dirname + './../build')) //npm build to deploy app

massive({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: true
  }).then( db => {
    app.set('db', db); 
  })


passport.use(new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
},  function(accessToken, refreshToken, extraParams, profile, done) {
        const db = app.get('db');

        db.find_user([profile.identities[0].user_id])
        .then( user => {
            if(user[0]) {
                return done(null, {id: user[0].id})
            } else {
                db.create_user([profile.name.givenName, profile.emails[0].value, profile.picture, profile.identities[0].user_id])
                .then(user => {
                    return done(null, {id: user[0].id});
                })
            }
        })

    done(null, profile);
    }
));


//================== ENDPOINTS ===============//

// authorize user
app.get('/auth', passport.authenticate('auth0'));

// redirect user to homepage
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/instructions',
    failureRedirect: 'http://localhost:3000/pagenotfound' //make a pagenotfound route
}));

passport.serializeUser((user, done)=> {
    done(null, user)
});

passport.deserializeUser((obj, done)=> {
    app.get('db').find_session_user([obj.identities.user_id])
    .then( user=> {
        return done(null, obj);
    })
    
});

//FOR TESTING THE LOGIN ===========================================REMOVE AFTER COMPLETING PROJECT//
app.get('/auth/me', (req, res, next) => {
    if (!req.user) {
      return res.status(404).send('User not found');
    } else {
      return res.status(200).send(req.user);
    }
  })
  

//log out
app.get('/auth/logout', (req, res)=> {
    req.logOut();
    return res.redirect(302, 'http://localhost:3000/#/')
});

//get top ten user scores
// app.get('/highscores', (req, res)=> {
//     app.get('db').getHighScores()
//     .then( scores => {
//         return res.status(200).send(scores);
//     })
// })

//get top ten scores from all users

//post score
// app.post('/addscore', (req, res)=> {
//     app.get('db').add_score([/*USERID*/, req.body.score])
//     .then( scores=> {
//         return res.status(200).send(scores);
//     })
// })

//delete scores
//delete user




app.listen(port, ()=> console.log(`Listening on port ${port}`));