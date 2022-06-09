const Sequelize = require('sequelize');
const connection = require('./database');

const Mesas = connection.define('Mesas',{
    mesa_id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    usuario:{
        type: Sequelize.INTEGER
    },
    pedido:{
        type: Sequelize.JSON
    }
})

Mesas.sync({force:false}).then(()=>{})

module.exports = Mesas;