const Sequelize = require("sequelize");
const config = require("./config");
class Database {
    constructor() {
        this.conexao = this.conexao();
    }
    conexao() {
        const Factory = new Sequelize(config.dbname, config.dbuser, config.dbp, {
            host: "localhost",
            dialect: "mysql",
            define: {
                freezeTableName: true,
                timestamps: false
            },
            
            logging: false
        });
        try {
            Factory.authenticate();
            console.log('Conectando ao banco de dados...');
        } catch (error) {
            console.error('Erro ao conectar ao banco de dados:', error);
        }
        return Factory;
    }
}


module.exports = new Database().conexao;
