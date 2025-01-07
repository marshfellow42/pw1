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
    switch (language) {
        case "en":
            res.json({
                msg: 'hello V3 ' + req.params.name
            })
        case "pt-br":
            res.json({
                msg: 'olá V3 ' + req.params.name
            })
        case "es":
            res.json({
                msg: 'hola V3 ' + req.params.name
            })
        default:
            res.json({
                msg: 'Invalid endpoint'
            })
    }
})

app.get('/v3/:name/:lang', function(req, res) {
    var language = req.params.lang
    switch (language) {
        case "en":
            res.send('hello V3 ' + req.params.name)
        case "pt-br":
            res.send('olá V3 ' + req.params.name)
        case "es":
            res.send('hola V3 ' + req.params.name)
        default:
            res.send('Invalid endpoint')
    }
})

app.get('/v3/*', function(req, res) {
    res.json({
        msg: 'Invalid endpoint'
    })
})

app.get('/v2/*', function(req, res) {
    res.json({
        msg: 'Invalid endpoint'
    })
})

app.get('/*', function(req, res) {
    res.json({
        msg: 'Invalid endpoint'
    })
})
