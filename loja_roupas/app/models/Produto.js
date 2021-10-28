// import Sequelize from 'sequelize';
// import Factory from '../../config/conexao';
const Sequelize = require("sequelize");
const Factory = require("../../config/conexao");

module.exports = Factory.define("produto", {
    nome: {
        type: Sequelize.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    id_marca: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    id_categoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    preco: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    foto_arquivo: {
        type: Sequelize.Sequelize.STRING,
        allowNull: true
    },
    foto_original: {
        type: Sequelize.Sequelize.STRING,
        allowNull: true
    },
    data_criacao: {
        type: Sequelize.Sequelize.STRING,
        allowNull: true
    },
    data_edicao: {
        type: Sequelize.Sequelize.STRING,
        allowNull: true
    }
});