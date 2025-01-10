const express = require('express')
const app = express()
const PORT = 3000
const users = require('./db.json')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(PORT, () => {
    console.log(`Users API listening on port ${PORT}`)
})

app.get('/users', (req, res) => {
    res.json(users.db)
})

app.get('/users/:id', (req, res) => {
    const user = users.db.find(u => u.id === parseInt(req.params.id))
    res.json(user)
})

app.post('/users/', (req, res) => {
    let lastId = Math.max(...users.db.map(u => u.id ))
    const user = {
        id: ++lastId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    }
    users.db.push(user)
    res.json(users.db)
})

app.delete('/users/:id', (req, res) => {
    users.db = users.db.filter(u => u.id !== parseInt(req.params.id));
    res.json(users.db);
});


app.put('/users/:id', (req, res) => {
    const index = users.db.findIndex(u => u.id === parseInt(req.params.id))
    users.db[index] = {
        id: parseInt(req.params.id),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    }
    res.json(users.db)
})
