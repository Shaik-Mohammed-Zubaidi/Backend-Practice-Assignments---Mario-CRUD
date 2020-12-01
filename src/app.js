const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here

app.get('/mario',(req,res)=>{
    marioModel.find().then((result)=>{
        res.json(result);
    }).catch(err=> console.log(err));
})

app.get('/mario/:id',(req,res)=>{
    const id= req.params.id;
    marioModel.findById(id).then(result=>{
        res.json(result);
    }).catch(err=>{
        res.json({message:err.message});
    })
})

module.exports = app;