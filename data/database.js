const Sequelize = require('sequelize')

const connection = new Sequelize('controladorDeStatus', 'root', '1232002',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection