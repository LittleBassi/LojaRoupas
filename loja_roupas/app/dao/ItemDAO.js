const Utils = require("../helper/Utils");
const item = require("../models/Item");

class ItemDAO {

    inserir(item) {
        return Item.create({
            id_produto: item.id_produto,
            id_tamanho: item.id_tamanho,
            data_criacao: Utils.getDataHora(),
        }).then(function (Item) {
            console.log("[BD]: Item inserido com sucesso!")
            return Item.id;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao inserir! => ' + erro)
            return false;
        });
    }

    alterar(dados) {
        return Item.update({ id_produto: dados.id_produto, id_tamanho: dados.id_tamanho, data_edicao: Utils.getDataHora(), }, {
            where: {
                id: dados.id
            }
        }).then(function (alteraritem) {
            console.log("[BD]: Item alterado com sucesso!")
            return true;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao alterar! => ' + erro)
            return false;
        });
    }



    async buscarTodos(attributes) {
        return Item.findAll({ attributes });
    }
 
    buscarPorId(id) {
        return Item.findByPk(id).catch(function (erro) {
            console.log('[BD]: Falha ao buscar! => ' + erro)
            return false;
        })
    }

    deletar(id) {
        return Item.destroy({
            where: {
                id: id
            }
        }).then(function () {
            console.log("[BD]: Item excluido com sucesso!")
            return true;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao excluir! => ' + erro)
            return false;
        });

    }
}

module.exports = new ItemDAO();