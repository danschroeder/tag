'use strict';
const authProvider = 'canvas';
const canvasConfig = {
    baseUrl: 'https://utah-valley-university.acme.instructure.com',
    clientID: '1529300000000000001',
    clientSecret: 'ZPuSK2ZKkVQWGTK93qnZXDBvDvMkmHXXoe6iBZjwgmSbAZC5aDRbYqyjlifoc8RM'
};
const PORT = 3000;
const HOST = 'localhost';

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
var User = require('./models/user.js');
//const https = require("https");
//const http = require('http');
//const expressVue = require('express-vue');
const passport = require('passport'),OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
const helmet = require('helmet');
const app = express();
app.use(express.static("public"));
app.use(session({
    secret: canvasConfig.clientSecret,
    resave: true,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(passport.initialize());
app.use(passport.session());


let oauthClient = new OAuth2Strategy({
    authorizationURL: canvasConfig.baseUrl + '/login/oauth2/auth',
    tokenURL: canvasConfig.baseUrl + '/login/oauth2/token',
    clientID: canvasConfig.clientID,
    clientSecret: canvasConfig.clientSecret,
    callbackURL: `http://${HOST}:${PORT}/auth/provider/callback`,
    passReqToCallback: true,
    profileFields: ['id','name','user']
},
function (req, accToken, refToken, profile, done) {
    //check user table for anyone with a userId of profile.id
    console.log('info returned');
    console.log(accToken);
    console.log(refToken);
    console.log(profile);
    
    User.findOne({
        'userId': profile.id
    }, function (err, user) {
        if (err) {
            console.log("error: "+err);
            return done(err);
        }
        //No user was found... so create a new user with values from canvas (all the profile. stuff)
        if (!user) {
            console.log('no user found creating user...')
            user = new User({
                userId: profile.id.toString(),
                name: profile.name,
                accessToken: accToken,
                refreshToken: refToken,
                provider: authProvider
            });
            user.save(function (err) {
                console.log('saving user to db...');
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            //found user. Return
            return done(err, user);
        }
    });
});
oauthClient.userProfile = function (accesstoken, done) {
    // choose your own adventure, or use the Strategy's oauth client
    this._oauth2._request("GET", canvasConfig.baseUrl + '/api/v1/users/self', null, null, accesstoken, (err, data) => {
      if (err) { return done(err); }
      try {
            console.log(data.toString());
          data = JSON.parse( data );
          console.log(Object.prototype.toString.call(data));
          
      }
      catch(e) {
          console.log('error');
        return done(e);
      }
      done(null, data);
    });
  };

passport.use(authProvider,oauthClient);


//######## END OF CONFIG STUFF ######
//######## START OF APP STUFF #######
// App

app.use(helmet());
//app.use(expressVueMiddleware);
app.get('/auth/provider', passport.authenticate(authProvider));
app.get('/auth/provider/callback', passport.authenticate(authProvider, {
    successRedirect: '/home',
    failureRedirect: '/login'
}));
// app.get('/auth/provider/callback',(req, res) => {
//     res.send();
// });

app.get('/', (req, res) => {
    res.send('Hello<br><a href="/auth/provider">Log in with Canvas</a>');
});
app.get('/login', (req, res) => {
    res.send('Hello<br><a href="/auth/provider">Log in with Canvas</a>');
});

app.get('/home', (req, res) => {

    res.send('Congrats you are logged in and connected to canvas!!!!!');

});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

//######## UTILITY FUNCTIONS ##########
function getUserInfo(){

}


