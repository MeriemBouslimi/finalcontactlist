const express = require('express')
const { MongoClient, ObjectID } = require('mongodb')
const assert = require('assert')
const app = express()
app.use(express.json())

const mongo_url = 'mongodb://localhost:27017'
const dataBase = "datalist"
MongoClient.connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    assert.equal(err, null, 'dataBase connexion failed')
    const db = client.db(dataBase)

   
    app.post('/add-contact', (req, res) => {
        let newContact = req.body
        db.collection('Contact').insertOne(newContact, (err, datalist) => {
            if (err) res.send('cant add contact')
            else res.send('contact added')
        
    })})

    app.delete('/delete-contact/:id', (req, res) => {
        let contactRemove = ObjectID(req.params.id)
        console.log(contactRemove)
        db.collection('Contact').findOneAndDelete({ _id: contactRemove }, (err, datalist) => {
            if (err) res.send('cant remove contact')
            else res.send('contact was removed')
        });
    })

    app.put('/modify_contact/:id', (req, res) => {
        let id = ObjectID(req.params.id)
        let modifiedContact = req.body
        db.collection('Contact').findOneAndUpdate({ _id: id }, {$set:{...modifiedContact}}, (err, datalist) => {
            if (err) res.send('cant modify contact')
            else res.send('contact was modified')
        });
    })

    app.get('/getcontact', (req, res) => {
        db.collection('Contact').find().toArray().then(contct=>res.send(contct)).catch(err=>{res.send(err)})
    })

})



app.listen(2000, (err) => {
    if (err) console.log("server is not running")
    else console.log("server is running on port 2000")
}) 