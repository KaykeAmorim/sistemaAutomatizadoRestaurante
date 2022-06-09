const { BINARY } = require('mysql/lib/protocol/constants/charsets');
const Sequelize = require('sequelize')
const connection = require('./database')

const Produtos = connection.define('Produtos', {
    produto_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true,
        autoIncrement:true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.STRING,
        allowNull: false
    },
    imagem:{
        type: Sequelize.BLOB('long'),
        allowNull: false
    },
    preco:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    categoria:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Produtos.sync({force:false}).then();

module.exports = Produtos