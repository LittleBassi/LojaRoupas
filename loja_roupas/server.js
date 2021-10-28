const app = require("./app");
const config = require("./config/config");

if (config.env == "umbler") {
    app.listen(process.env.PORT, () => {
        console.log(`NODE_ENV: ${config.env}`);
        console.log(`Servidor iniciado em ambiente de PRODUÇÃO na porta ${process.env.PORT}`);
    });
}

if (config.env == "development") {
    app.listen(config.porta, () => {
        console.log(`NODE_ENV: ${config.env}`);
        console.log(`Servidor iniciado em ambiente de testes na porta ${config.porta}`);
    });
}

if (config.env == "production") {
    app.listen(config.porta, () => {
        console.log(`NODE_ENV: ${config.env}`);
        console.log(`Servidor iniciado em ambiente CLOUD na porta ${config.porta}`);
    });
}