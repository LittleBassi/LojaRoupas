// import Sequelize from 'sequelize';
// import Factory from '../../config/conexao';
const Sequelize = require("sequelize");
const Factory = require("../../config/conexao");

module.exports = Factory.define("marca", {
    nome: {
        type: Sequelize.Sequelize.STRING,
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