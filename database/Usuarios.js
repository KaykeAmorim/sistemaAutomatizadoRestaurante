const Sequelize = require('sequelize')
const connection = require('./database')

const Usuarios = connection.define('Usuarios', {
    usuario_id:{
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },

    CPF:{
        type: Sequelize.STRING,
        allowNull: false
    },

    senha:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

Usuarios.sync({force: false}).then(()=>{})

module.exports = Usuarios;