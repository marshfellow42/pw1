const express = require('express')
const app = express()
const PORT = 3000

app.listen(PORT, () => {
    console.log('Hello There')
})

app.get('/', function(req, res) {
    res.send('hello')
})

app.get('/v2/:name', function(req, res) {
    res.send('hello V2 ' + req.params.name)
})
/*
app.get('/v2/*', function(req, res) {
    res.json({
        msg: 'Invalid endpoint'
    })
})
*/

app.get('/v3/:name', function(req, res) {
    res.send('hello V3 ' + req.params.name)
})

app.get('/v3/:name/json', function(req, res) {
    res.json({
        msg: 'hello V3 ' + req.params.name
    })
})

app.get('/v3/:name/json/:lang', function(req, res) {
    var language = req.params.lang
    if (language == "en") {
        res.json({
            msg: 'hello V3 ' + req.params.name
        })
    }
    else if (language == "pt-br") {
        res.json({
            msg: 'olá V3 ' + req.params.name
        })
    }
    else {
        res.json({
            msg: 'Invalid endpoint'
        })
    }
})
