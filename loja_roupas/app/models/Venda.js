// import Sequelize from 'sequelize';
// import Factory from '../../config/conexao';
const Sequelize = require("sequelize");
const Factory = require("../../config/conexao");

module.exports = Factory.define("venda", {
    id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    id_item: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    subtotal: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    frete: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    total: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    forma_pagamento: {
        type: Sequelize.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    parcelas: {
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