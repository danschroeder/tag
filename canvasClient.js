'use strict';
var request = require('request');


function CanvasClient () {
    var baseApiEndpoint = '/api/v1';
    var hostName = 'https://utah-valley-university.acme.instructure.com';
    this._baseApiUrl = hostName + baseApiEndpoint;
  }

  CanvasClient.prototype.getCurrentCourses = function (token,callback) {
    var options = {
      method: 'GET',
      url: this._baseApiUrl + '/courses?enrollment_type=teacher',
      headers: {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        authorization: 'Bearer ' + token
      } 
    };
    this._apiRequest(options,function(data){
      console.log('2'+data);
      callback(data);
    });
  };

  CanvasClient.prototype._apiRequest = function (options, callback) {
    console.log(options);
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log('1'+body);
      callback(body);
    });
  };

  module.exports = CanvasClient;