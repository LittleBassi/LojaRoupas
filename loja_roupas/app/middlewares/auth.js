const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const configAuth = require("../../config/auth");

module.exports = async function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: true, code: 130, message: "Erro: Acesso não autorizado!" })
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = await promisify(jwt.verify)(token, configAuth.secret);
        req.usuarioId = decoded.id;
        return next();
    } catch (error) {
        return res.status(401).json({ error: true, code: 130, message: "Erro: Acesso não autorizado!" })
    }
};