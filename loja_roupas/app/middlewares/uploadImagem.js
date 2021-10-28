const multer = require("multer");
const crypto = require("crypto");
const { extname } = require("path");
const Utils = require("../helper/Utils");

module.exports = {
    storage: multer.diskStorage({
        destination: async function (req, file, cb) {
           let caminho = 'imagem';
            cb(null, caminho);
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, res) => {
                if (err) return cb(err);
                return cb(null, res.toString('hex') + extname(file.originalname))
            });

        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
            return cb(null, true);
        } else {
            return cb(null, false);
        }
    }
};


