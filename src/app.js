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
        if(!result){
            res.sendStatus(400);
            return;
        }
        res.json(result);
    }).catch(error=>{
        res.status(400).json({message:error.message});
    })
})

module.exports = app;