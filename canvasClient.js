var https = require('https');


var canvasClient = Class.create();
canvasClient.prototype = {
    
	/*
	** initialization will check for exactly 1 matching client record using the name
	*/
	initialize: function (access_token) {
        var baseApiEndpoint = '/api/v1';
        var authEndpoint = '/login/oauth2/auth';
        var tokenEndpoint = '/login/oauth2/token';
        var hostName = 'utah-valley-university.acme.instructure.com';
        this._authRedirectUri = 'http://localhost:3000/oauth/callback';
        this._clientID = '1529300000000000001';
        this._clientSecret = 'ZPuSK2ZKkVQWGTK93qnZXDBvDvMkmHXXoe6iBZjwgmSbAZC5aDRbYqyjlifoc8RM';
        this._hostName = hostName;
        this._baseApiPath = baseApiEndpoint;
        this._authPath = authEndpoint;
        this._tokenPath = okenEndpoint;
        this._validToken = false;
        this._accessToken = {};
    },




    
    getAccessToken: function(){
        if(this._validToken){
            return this._tokenManager.access_token;
        } else {
            var options = {
                "method": "GET",
                "hostname": this._hostName,
                "port": null,
                "path": this._authPath+'?client_id='+this._clientID+'&response_type=code&redirect_uri='+this._authRedirectUri,
                "headers": {
                  "cache-control": "no-cache"
                }
              };

        }
    },

    _httpsRequest: function(options){
        
          var req = https.request(options, function (res) {
            var chunks = [];
            console.log("requested");
            res.on("data", function (chunk) {
              chunks.push(chunk);
            });
        
            res.on("end", function () {
              var body = Buffer.concat(chunks);
              console.log(body.toString());
              //resp.send(body.toString());
              quote = body.toString();//.toString();
              callback(quote);//callback response to original request
            });
          });
          req.end();

    },
	
	type: 'client'
};