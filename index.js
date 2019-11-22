const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(express.static(__dirname + '/public'))
app.set('view engine','ejs')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

const MongoObjectID = require('mongodb').ObjectID
const mongo = require('./connect')

app.get('/',(req,res)=>{
   mongo.then((db)=>{
       db.collection('users').find().toArray((err,result)=>{
           res.render('list',{data:result})
       })
   })
})

app.get('/delete/:_id',(req,res)=>{
    mongo.then((db)=>{
        query={_id:new MongoObjectID.ObjectID(req.params._id)}
        db.collection('users').deleteOne(query,(err,r)=>{
            res.redirect('/')
        })
    })
})

app.get('/insert',(req,res)=>{
    res.render('insert')
})

app.post('/insert',(req,res)=>{
    mongo.then((db)=>{
        var data ={
            fname : req.body.fname,
            lname : req.body.lname,
            email : req.body.email,
            address: req.body.address,
            color: req.body.color,
            gender: req.body.gender
        }
        db.collection('users').insertOne(data,(err,r)=>{
            res.redirect('/')
        })
    })
})

app.get('/update/:_id',(req,res)=>{
    mongo.then((db)=>{
        query={_id:new MongoObjectID.ObjectID(req.params._id)}
        db.collection('users').find(query).toArray((err,result)=>{
            var data ={
                _id : result[0]._id,
                fname : result[0].fname,
                lname : result[0].lname,
                email : result[0].email,
                address: result[0].address,
                color: result[0].color,
                gender: result[0].gender
            }
            res.render('update',data)
        })
    })
})

app.post('/update',(req,res)=>{
    mongo.then((db)=>{
        query = {_id : new MongoObjectID.ObjectID(req.body._id)}
        data = {$set:{
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            address: req.body.address,
            color: req.body.color,
            gender: req.body.gender
        }}
        db.collection('users').updateOne(query,data,(err,r)=>{
            res.redirect('/')
        })
    })
})
app.listen(3000,() => {
    console.log('Server Started on localhost:3000')
})
