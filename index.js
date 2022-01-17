const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./data/database')


app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

connection
    .authenticate()
    .then(() => {
        console.log('Conectado com db')
    }).catch((error) => {
        console.log(`Deu ruim ${error}`)
    })

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(8080, () => {
    console.log('O servidor está rodando')
})