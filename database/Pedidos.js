const Sequelize = require('sequelize')
const connection = require('./database')

const Pedidos = connection.define('Pedidos', {
    pedido_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    pedido:{
        type: Sequelize.JSON,
        allowNull: false
    }
})

Pedidos.sync({force:false}).then(()=>{})

module.exports = Pedidos;