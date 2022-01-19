const Sequelize = require('sequelize')
const connection = require('./database')


const Config = connection.define('config',{
    time: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})

Config.sync({force: false})
    .then(() => {})

module.exports = Config