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
    selectStatus == 'ativado' ? selectStatus = 1 : selectStatus = 0

    Machine.create({
        name : name,
        status : selectStatus
    }).then(() => {
        res.redirect('/')
    })
})

app.post('/edit', (req, res) => {
    let id = req.body.id
    let name = req.body.name
    let selectStatus = req.body.selectStatus
    selectStatus == 'ativado' ? selectStatus = 1 : selectStatus = 0

    Machine.update({name: name, status: selectStatus},{
        where: {
        id: id
        }
    }).then(() => {
        res.redirect('/')
    })
})

app.post('/delete',(req, res) => {
    let id = req.body.id
    if(id != undefined){
        if(!isNaN(id)){
            Machine.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect('/')
            })
        }
        else{
            res.redirect('/')
        }
    }
    else{
        res.redirect('/')
    }
})

app.listen(8080, () => {
    console.log('O servidor está rodando')
})