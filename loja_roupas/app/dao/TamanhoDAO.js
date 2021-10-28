const Utils = require("../helper/Utils");
const Tamanho = require("../models/Tamanho");

class TamanhoDAO {

    inserir(tamanho) {
        return Tamanho.create({
            nome: tamanho.nome,
            data_criacao: Utils.getDataHora(),
        }).then(function (Tamanho) {
            console.log("[BD]: Tamanho inserido com sucesso!")
            return Tamanho.id;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao inserir! => ' + erro)
            return false;
        });
    }

    alterar(dados) {
        return Tamanho.update({ nome: dados.nome, data_edicao: Utils.getDataHora(), }, {
            where: {
                id: dados.id
            }
        }).then(function (alterarTamanho) {
            console.log("[BD]: Tamanho alterado com sucesso!")
            return true;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao alterar! => ' + erro)
            return false;
        });
    }



    async buscarTodos(attributes) {
        return Tamanho.findAll({ attributes });
    }
 
    buscarPorId(id) {
        return Tamanho.findByPk(id).catch(function (erro) {
            console.log('[BD]: Falha ao buscar! => ' + erro)
            return false;
        })
    }

    deletar(id) {
        return Tamanho.destroy({
            where: {
                id: id
            }
        }).then(function () {
            console.log("[BD]: Tamanho excluido com sucesso!")
            return true;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao excluir! => ' + erro)
            return false;
        });

    }
}

module.exports = new TamanhoDAO();