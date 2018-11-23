const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('./config/db');
const {Emp} = require('./models/employee.js');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

// mlab uri link
//heroku config:set MONGOLAB_URI='mongodb://chethan:chethan$3kailash@ds245240.mlab.com:45240/daily-weekly'


app.use(bodyParser.json());

//middlewares
app.use(function(req, res, next){
    console.log(`${req.method} - ${req.url} - ${new Date()}`);
    next();
});

// //Route handlers
// app.method(Path, Handler)
app.get('/', function(req, res){
    res.send({
        notice: "Welcome to the Employee's portal."
    });
});

app.get('/about', function(req, res){
    res.send({
        notice: "Welcome to the About us site."
    });
});


// list all
app.get('/patients', function(req, res){
    Emp.find().then((emps) => {
        res.send(emps);
    }).catch(function(err){
        res.send(err);
    })
});

//create
app.post('/patients', function(req, res){
    let body = req.body;
    let emp = new Emp(body);
    emp.save().then((emp) => {
        res.send({
            emp,
            notice: "Successfully created"
        });
    })
    .catch((err) => {
        res.send(err);
    })
});

//findOne
app.get('/patients/:id', function(req, res){
    let id = req.params.id;
    if(!ObjectId.isValid(id))
    {
        res.send({
            notice: "invalid employee id"
        });
        return false;
    }
    Emp.findById(id).then(function(emp){
        res.send(emp);
    }).catch((err) => {
        res.send(err);
    })
});

//delete
app.delete('/patients/:id', function(req, res){
    let id = req.params.id;
    if(!ObjectId.isValid(id))
    {
        res.send({
            notice: "invalid object id"
        });
        return false;
    }
    Emp.findByIdAndRemove(id).then((emp) =>{
        res.send({
            emp,
            notice: 'successfully removed'
        });
    }).catch((err) => {
        res.send(err);
    });
});

//update
app.put('/patients/:id', function(req, res){
    let id = req.params.id;
    let body = req.body;
    if(!ObjectId.isValid(id))
    {
        res.send({
            notice: 'Invalid Id'
        });
        return false;
    }

    Emp.findByIdAndUpdate(id, { $set: body}, {new: true})
    .then((emp) => {
        res.send(emp);
    }).catch((err) => {
        res.send(err);
    })

});



app.listen(port, function(){
    console.log(`Listening to port ${port}...`);
});







