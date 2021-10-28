const compression = require("compression");
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const moment = require("moment");
const path = require("path");
const Utils = require("./app/helper/Utils");
const config = require("./config/config");
require("./config/conexao");
// const logger = require("./app/helper/Logger");
const morgan = require("morgan");
const validarAcesso = require("./app/middlewares/auth");
class App {
	constructor() {
		this.app = express();
		this.middlewares();
		this.routes();
	}
	middlewares() {
		this.app.use(compression());
		this.app.use(express.json());
		// this.app.use(morgan("combined", { stream: logger.stream }));
		this.app.use("/arquivos", express.static(path.resolve(__dirname, config.storage)));

		// Autorização do front para acessar a API
		this.app.use((req, res, next) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
			res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
			this.app.use(cors());
			next();
		});
	}
	routes() {
		this.app.use(routes);
	}
}

module.exports = new App().app;