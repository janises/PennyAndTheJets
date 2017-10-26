require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , session = require('express-session')
    , cors = require('cors')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , app = express()
    , port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + './../build')) //npm build to deploy app

massive(process.env.DATABASE_URL)
.then( db => {
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
                // console.log('user found',user)
                return done(null, {id: user[0].id})
            } else {
                db.create_user([profile.name.givenName, profile.emails[0].value, profile.picture, profile.identities[0].user_id])
                .then(user => {
                    return done(null, {id: user[0].id});
                })
            }
        })
    }
));


//================== ENDPOINTS ===============//

// authorize user
app.get('/auth', passport.authenticate('auth0'));

// redirect user to homepage
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: `/#/instructions`,
    failureRedirect: `/#/pagenotfound` 
}));

passport.serializeUser((user, done)=> {
    // console.log('serialize', user)
    done(null, user)
});

passport.deserializeUser((obj, done)=> {
    // console.log('line 80', obj.id)
    app.get('db').find_session_user([obj.id])
    .then( user=> {
    // console.log('deserialize', user)
       done(null, user[0]);
    // done(null, obj)
    })
    
});

//FOR TESTING THE LOGIN ===========================================REMOVE AFTER COMPLETING PROJECT//
app.get('/auth/me', (req, res, next) => {
    console.log(req.user)
    let response, status=200
    if (!req.user) {
    //    res.status(404).send('User not found');
    status=404
    response='User not found'
    } else {

    //    res.status(200).send(req.user);
    response=req.user
    }
    res.status(status).send(response)
  })
  

//log out
app.get('/auth/logout', (req, res)=> {
    req.logOut();
    res.redirect(302, '/#/')
});

// get overall top ten user scores
app.get('/highscores', (req, res)=> {
    app.get('db').getHighScores()
    .then( scores => {
        res.status(200).send(scores);
    })
})


// post score
app.post('/addscore', (req, res)=> {
    // console.log('line121 add score', req.body.score)
    // console.log('server line122 user', req.user.id)
    if(req.user.id) {
        app.get('db').add_score([req.user.id, req.body.score])
        .then( scores=> {
             res.status(200).send(scores);
        })
    } else {
        res.status(200).redirect('/#/highscores/')
    }
    
})

//get user scores
app.get('/userscores', (req, res)=> {
    app.get('db').get_user_scores([req.user.id])
    .then(scores => {
        
        let userScores = scores.map(score => {
            // console.log('scores line 132', score.score)
            return score.score
        })
        // console.log(userScores)
        res.status(200).send(userScores);
    })
})

//get username
app.get('/username', (req, res)=> {
    if(req.user) {
        app.get('db').get_username([req.user.id])
        .then(username => {
            // console.log('username, line 141', req.user)
            res.status(200).send(username[0])
        })
    } else {
        // console.log('server 157, no req.user.id')
    }
  
})

//update username
app.put('/updateusername', (req, res)=> {
    // console.log('153 username', req.body.username)
    app.get('db').update_username([req.body.username, req.user.id])
    .then(username => {
        // console.log('line155 app.put', username[0].username)
        res.status(200).send(username[0].username);
    })
})

// delete user
app.delete('/deleteuser/:id', (req, res)=> {
    app.get('db').delete_user([req.params.id])
        .then(users => {
            res.status(200).redirect('/#/')
        })
})


app.listen(port, ()=> console.log(`Listening on port ${port}`));