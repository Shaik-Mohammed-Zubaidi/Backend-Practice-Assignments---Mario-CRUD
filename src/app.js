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
    marioModel.findById(id).then((result,error)=>{
        if(!result){
            // console.log(error);
            // res.statusCode= 404;
            // res.json({message: error.message});
            res.sendStatus(404);
            return;
        }
        res.json(result);
    }).catch(error=>{
        res.status(400).json({message:error.message});
    })
})

app.post('/mario',(req,res)=>{
    let {name,weight} = req.body;
    if (!name || !weight) {
        res.statusCode = 400;
        res.json({ message: 'either name or weight is missing' });
        return;
    }
    const mario = new marioModel({
        name: name,
        weight: weight
    })
    mario.save().then((ans) => res.status(201).json(ans));
})

app.patch('/mario/:id',(req,res)=>{
    const id= req.params.id;
    const {name,weight}= req.body;
    marioModel.findByIdAndUpdate(id,{name: name, weight: weight}).then(result=>{
        res.json(result);
    }).catch(error=>{
        res.json({message:error.message});
    })
})

module.exports = app;