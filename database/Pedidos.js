const Sequelize = require('sequelize')
const connection = require('./database')

const Pedidos = connection.define('Pedidos', {
    pedido_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    produto:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantidade:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mesa:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    confirmado:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

Pedidos.sync({force:false}).then(()=>{})

module.exports = Pedidos;