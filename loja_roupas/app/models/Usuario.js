// import Sequelize from 'sequelize';
// import Factory from '../../config/conexao';
const Sequelize = require("sequelize");
const Factory = require("../../config/conexao");

module.exports = Factory.define("usuario", {
    nome: {
        type: Sequelize.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    senha: {
        type: Sequelize.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    cpf: {
        type: Sequelize.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    id_perfil: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
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