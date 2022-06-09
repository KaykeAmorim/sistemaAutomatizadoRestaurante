const Sequelize = require('sequelize')
const connection = require('./database')

const Categorias = connection.define('Categorias',{
    categoria_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Categorias.sync({force:false}).then();

module.exports = Categorias;