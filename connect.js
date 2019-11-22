const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'webphuket'

module.exports = new Promise((resolve,reject) =>{
    MongoClient.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
        if (err) throw err

        const mongo = client.db(dbName)
        console.log("Connected successfully to server")
        resolve(mongo)
    })
})