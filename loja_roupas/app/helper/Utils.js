// import Factory from '../../config/conexao';
// import Sequelize from 'sequelize';
const Factory = require("../../config/conexao");
const Sequelize = require("sequelize");
const { string } = require("yup");
const { promisify } = require('util')
const fastFolderSize = require('fast-folder-size')
const moment = require("moment-timezone")
const nodemailer = require('nodemailer');
const key = require('../../key.json');
const axios = require('axios').default;
const path = require("path");
var fs = require('fs');
const http = require('https');
const { jsPDF } = require('jspdf');
global.window = { document: { createElementNS: () => { return {} } } };
global.navigator = {};
global.html2pdf = {};
global.btoa = () => { };
const config = require('../../config/config')

class Utils {

    getDataHora() {
        let dataHoraAtual = moment().tz("America/Sao_Paulo").format("YYYY-MM-DD HH:mm:ss");
        return dataHoraAtual;
    }
    getData() {
        let dataAtual = moment().tz("America/Sao_Paulo").format("YYYY-MM-DD");
        return dataAtual;
    }
    getIntervaloDias(dias) {
        let dataAtual = moment().tz("America/Sao_Paulo").subtract(dias, 'days').format("YYYY-MM-DD");
        return dataAtual;
    }
    getAno() {
        let dataAtual = moment().tz("America/Sao_Paulo").format("YYYY");
        return dataAtual;
    }
    getMes() {
        let dataAtual = moment().tz("America/Sao_Paulo").format("MM");
        return dataAtual;
    }
    getDataHoraTMC() {
        let dataHoraAtual = moment().tz("America/Sao_Paulo");
        return dataHoraAtual;
    }
}

module.exports = new Utils();