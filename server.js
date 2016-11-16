let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
let mongoURL = 'mongodb://localhost:27017/test';
let db;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    bodyParser.json();
    req.db = db;
    next();
});

app.get('/api/book', (req, res) => {
    req.db.collection('books').find().toArray(function (err, docs) {
        if (err !== null) {
            console.log(err);
        }
        res.status(200);
        return res.json(docs);
    });
});

app.get('/api/book/:bookID', (req, res) => {
    try {
        req.db.collection('books').findOne({ _id : ObjectId(req.params.bookID) }, function (err, doc) {
            if (err !== null) {
                return res.status(404).send();
            }
            return res.json(doc);
        });
    } catch (e) {
        console.log(e);
    }
    return res.status(404).send();
});

app.post('/api/book', (req, res) => {
    let book = req.body;
    req.db.collection('books').insert(book, function (err) {
        if (err !== null) {
            console.log(err);
            return res.status(400);
        }
        return res.status(200).json({ _id: book._id });
    });
});

app.delete('/api/book/:bookID', (req, res) => {
    try {
        req.db.collection('books').remove({ _id : ObjectId(req.params.bookID) });
        return res.status(204).send();
    } catch (e) {
        console.log(e);
    }
    return res.status(404).send();
});

MongoClient.connect(mongoURL, (err, database) => {
    if (err !== null) {
        console.log(err);
    }
    db = database;
});

app.listen(5000, function () { });
