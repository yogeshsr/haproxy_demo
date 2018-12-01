'use strict';

const express = require('express');
const http = require('http');

var SomeLimitedResource = function(limit){
    this.limit = limit
    this.count = 0;
};
SomeLimitedResource.prototype.borrow = function (){
  if(this.count >= this.limit){
    return false;
  }
  this.count = this.count + 1;
  return true;
};
SomeLimitedResource.prototype.release = function(callback){
  this.count = this.count - 1;
};

const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();
const MAX_AVAILABLE_RESOURCE = 10;
const limitedResource = new SomeLimitedResource(MAX_AVAILABLE_RESOURCE);


app.get('/slow', (req, res) => {
  // delay res by n millisec
  setTimeout((function() {res.send('Hello world - slow1\n')}), 4000);

});

app.get('/fast', (req, res) => {
  // delay res by n millisec
  setTimeout((function() {res.send('Hello world - fast1\n')}), 200);
});


app.get('/pool', (req, res) => {

    if (limitedResource.borrow()) {
        // simulate delay before the resource is released and response is send
        setTimeout((function() {
            limitedResource.release()
            res.send('Hello world - pool\n')    
        }), 100);
    } else {
        // Resource is not avaiable; fail the request
        res.status(503);
        res.send('Hello world - pool failed\n')
    }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);