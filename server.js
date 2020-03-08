const express = require('express')
const app = express()
app.use(express.json())
const db = require('./db')
const path = require('path');
const uuid = require('uuid')
const { Person, Place, Thing } = db.models


app.get('/', (req, res, next)=> {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
app.get('/api/people', async(req, res, next) =>
{
    const people = await Person.findAll()
    res.send(people)
})
app.get('/api/places', async(req, res, next) =>
{
    const places = await Place.findAll()
    res.send(places)
})
app.get('/api/things', async(req, res, next) =>
{
    const things = await Thing.findAll()
    res.send(things)
})

app.use((err, res, next) => {
    res.status(500).send({message: err.message})
})
const port = process.env.PORT || 3000

db.sync()
.then( () => {
    
    app.listen(port, () => {`Listenging on port ${port}`})
})

module.exports = app;