const Sequelize = require('sequelize')

const connection = new Sequelize('heroku_b875273035d0215', 'b67542e7153b40', '374ff4d9',{
    host: 'us-cdbr-east-05.cleardb.net',
    dialect: 'mysql'
})


module.exports = connection