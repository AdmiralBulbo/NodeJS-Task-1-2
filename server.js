const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
var db;
var dburl = 'mongodb+srv://rwuser:mynewpassword1@mycluster-mmcx1.azure.mongodb.net/admin?retryWrites=true&w=majority';

app.use(bodyParser.json())
app.use(express.static('public'))

MongoClient.connect(dburl, (err, client) => {
    if (err) return console.log(err);
    db = client.db('workersdb');
    app.listen(3000, function() {
        console.log('Server connected to MongoDB and listening on 3000. Go to localhost:3000 to open the site.')
      })
})

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html');
})

app.get('/workers', (req, res) => {
    db.collection('workers').find().toArray((err, result) => {
        if (err) return console.log(err);
        console.log('Get all');
        res.send(result);
    })
})

app.get('/workers/:id', (req, res) => {
    var id = req.params.id;
    db.collection('workers').findOne({_id: ObjectID(id)}, (err, result) => {
        if (err) return console.log(err);
        res.send(result);
    })
})

app.delete('/workers/:id', (req, res) => {
    var id = req.params.id;
    db.collection('workers').deleteOne({_id: ObjectID(id)}, (err, result) => {
        if (err) return console.log(err);
        res.send(result);
        console.log('deleted');
    })
})

app.put('/workers/:id', (req, res) => {
    var id = req.params.id;
    var newvalues = { $set: req.body};
    db.collection('workers').updateOne({_id: ObjectID(id)}, newvalues, (err, result) => {
        if (err) return console.log(err);
        res.send(result);
        console.log('updated');
    })
})

app.post('/workers', (req, res) => {
    db.collection('workers').insertOne(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('saved to database');
        res.redirect('/');
    })
})