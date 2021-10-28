class config {
    constructor() {
        // NodeJS
        process.env.NODE_ENV = "development";
        this.env = process.env.NODE_ENV;

        this.url = "http://localhost:3000"
        this.porta = "3080"
        this.storage = "public/"
        this.dbname = "loja_de_roupas"
        this.dbuser = "root"
        this.dbp = "Acdc1999"
        this.dbhost = "localhost"
    }
}

module.exports = new config();
