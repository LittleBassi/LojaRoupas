const Utils = require("../helper/Utils");
const Marca = require("../models/Marca");

class MarcaDAO {

    inserir(marca) {
        return Marca.create({
            nome: marca.nome,
            data_criacao: Utils.getDataHora(),
        }).then(function (Marca) {
            console.log("[BD]: Marca inserido com sucesso!")
            return Marca.id;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao inserir! => ' + erro)
            return false;
        });
    }

    alterar(dados) {
        return Marca.update({ nome: dados.nome, data_edicao: Utils.getDataHora(), }, {
            where: {
                id: dados.id
            }
        }).then(function (alterarMarca) {
            console.log("[BD]: Marca alterado com sucesso!")
            return true;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao alterar! => ' + erro)
            return false;
        });
    }



    async buscarTodos(attributes) {
        return Marca.findAll({ attributes });
    }
 
    buscarPorId(id) {
        return Marca.findByPk(id).catch(function (erro) {
            console.log('[BD]: Falha ao buscar! => ' + erro)
            return false;
        })
    }

    deletar(id) {
        return Marca.destroy({
            where: {
                id: id
            }
        }).then(function () {
            console.log("[BD]: Marca excluido com sucesso!")
            return true;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao excluir! => ' + erro)
            return false;
        });

    }
}

module.exports = new MarcaDAO();