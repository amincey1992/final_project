/**
 * Created by Mincey on 12/1/16.
 */
var port = Number(process.env.PORT || 3000);
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/client'));
app.get('/', function(req, res){
    res.sendFile('/index.html'); //I've tried playing around with the path multiple ways and still get errors
});

app.listen(port);