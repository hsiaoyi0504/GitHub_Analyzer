const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;

const random = require('mongoose-simple-random');

mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise;

var db = mongoose.connection;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/build')));

const Schema = mongoose.Schema;



const reposchema = new Schema({
  time:Date,
  user:String,
  repo:String,
  languanges:String
})

reposchema.plugin(random);

const repo = mongoose.model('repos', reposchema);

app.get('/api/', function (req, res) {
  console.log('Got a GET request');
});

app.post('/api/', function (req, res) {
  console.log('Got a POST request');
});

app.post('/api/recommendation/', (req,res)=>{
  const newPost={
    time:JSON.parse(req.body.time),
    user:req.body.userName,
    repo:req.body.repoName,
    languages:req.body.language
  }

  console.log(req.body);
  const data = new repo(newPost);
  

  data.save((e)=>{
    if(e) throw e;
    repo.findOneRandom(function(err,element){
      if(err) console.log(err);
      else{
        console.log(element);
        repo.findOne({"_id":element._id})
        .then(
          repo=>{
            console.log(repo);
            res.send(repo)});
     
     }
   })
  })

})



app.listen(port, function () {
  console.log('GitHub Analyzer App listening on port: ' + port);
});