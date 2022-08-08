// Project Dependencies
const cors = require('cors')
const bodyParser = require('body-parser')

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const { request } = require('http');

// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));

// Callback function to complete GET '/all'
app.get('/all', (req, res)=> {
    console.log('get all from the server');
    res.status(200).send(projectData);
})

// Post Data
app.post('/post', (req, res)=> {
    console.log('post data to the server', req.body);
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        feeling: req.body.feeling
    };
    res.status(200).send(projectData)
})

// Setup Server
const port = 3000;

app.listen(port, ()=> {
    console.log('server is running on port', port, '...');
})