const Sequelize = require('sequelize')
const connection = new Sequelize('legare','kayke','K310104+a',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = connection;