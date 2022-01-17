const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./data/database')
const Machine = require('./data/Machine')



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
    Machine.findAll({raw: true, order: [
        ['id', 'DESC']
    ]}).then((machine) => {
        res.render('index',{
            machine: machine
        })
    })

})

app.post('/register', (req, res) => {
    let name = req.body.name
    let selectStatus = req.body.selectStatus
    console.log(selectStatus)
    selectStatus == 'ativado' ? selectStatus = 1 : selectStatus = 0
    console.log(selectStatus)

    Machine.create({
        name : name,
        status : selectStatus
    }).then(() => {
        res.redirect('/')
    })

})

app.listen(8080, () => {
    console.log('O servidor está rodando')
})