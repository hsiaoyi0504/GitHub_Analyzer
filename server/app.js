const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));

const schema = new mongoose.Schema({ /* TODO*/});

app.get('/api/', function (req, res) {
  console.log('Got a GET request');
});

app.post('/api/', function (req, res) {
  console.log('Got a POST request');
});

app.listen(port, function () {
  console.log('GitHub Analyzer App listening on port: ' + port);
});