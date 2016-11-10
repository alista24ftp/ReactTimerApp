var express = require('express');

// Create our app
var app = express();

// For Heroku use process.env.PORT, but locally since we dont have process.env
// variable we'll use port 3000
const PORT = process.env.PORT || 3000;

// For some APIs like openWeatherMap, they only handle http but NOT https requests,
// so we need to redirect all https requests to http
app.use(function(req, res, next){
  if(req.headers['x-forwarded-proto'] === 'https'){
    // redirect to http protocal
    res.redirect('http://' + req.hostname + req.url);
  }else{
    next(); // ie. if it's http, localhost, or anything else, process as normal
  }
});

// Tell it which folder we want to serve
app.use(express.static('public'));

// Start server
app.listen(PORT, function(){
  console.log('Express server is up on port ' + PORT);
});
