const Sequelize = require('sequelize')
const connection = require('./database')

const Machine = connection.define('machines',{
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Machine.sync({force: false})
    .then(() => {})

module.exports = Machine