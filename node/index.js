var express = require('express');
var app = express();
var fs = require("fs");



app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader("Content-Type", "application/json");
    // res.finished || next();
    res.setHeader("Access-Control-Allow-Credentials", true);

    var nodeSSPI = require('node-sspi');
    var nodeSSPIObj = new nodeSSPI({
        // authoritative: false,
        // offerBasic: true,
        // offerSSPI: false,
        // retrieveGroups: false
    });
    nodeSSPIObj.authenticate(req, res, function (err) {

        if (err) {
            console.log(err);
        }

        res.finished || next();
    });
});

// app.use(function (req, res, next) {
//     console.log('Second use');
//     var out =
//         'Hello ' +
//         req.connection.user 
//     res.send(out);
// });

app.get('/user', function (req, res) {
    var result = { "name": "Welcome, "+ req.connection.user };
    res.send(result);
})

app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
    });
 })
 

var port = process.env.PORT || 8081;
var server = app.listen(port, function () {

    console.log(
        'Express server listening on port %d in %s mode',
        port,
        app.get('env')
    );
})