//Code for the given assignment : 

//Importing required packages into the application.
let express = require('express');
let bodyParser = require("body-parser");

//Using a mock express server to serve the requests. 
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Configuration of the given route : units/si 
app.get('/units/si', function (req, res) {
    
    //reading the paramters sent with the request object
    var reqData = req.query.units;
    reqData = reqData.substring(1, reqData.length - 1);
    var inputString = reqData.toString();
    var unitString = inputString;
    var convString = inputString;
    //console.log('-----reqdata type : ' + type);

    //A mapping to the SI equivalent of units and their corresponding conversions.Each unit is another object containing the required parameters
    var siEquiv = {
        "degree": {
            "name": "rad",
            "conversion": 0.01745329251
        },
        "minute": {
            "name": "s",
            "conversion": 60
        },
        "hour": {
            "name": "s",
            "conversion": 3600
        },
        "day": {
            "name": "s",
            "conversion": 86400
        },
        "hectare": {
            "name": "m^2",
            "conversion": 10000
        },
        "litre": {
            "name": "m^3",
            "conversion": 0.001
        },
        "tonne": {
            "name": "kg",
            "conversion": 10000
        }
    }


    //Converting the units to SI using the associative array as defined above.
    for (var unit in siEquiv) {
        convString = convString.replace(new RegExp(unit), siEquiv[unit].conversion);
        inputString = inputString.replace(new RegExp(unit), siEquiv[unit].name);

    }

    //Used the built-in method in vanilla javascript called 'eval'.
    convString = eval(convString);
    // //console.log(eval(convString));
    
    //The response is an object with two properties and their corresponding values
    res.send({ 'unit_name': inputString, 'multiplication_factor': convString });
});

//Configuration of server : The express server runs listens to port 3001.
let server = app.listen(3001, function () {
    console.log('Server is starting on port 3001');
});
