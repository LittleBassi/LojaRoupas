const Utils = require("../helper/Utils");
const venda = require("../models/Venda");

class VendaDAO {

    inserir(venda) {
        return Venda.create({
            id_cliente: venda.id_cliente,
            id_item: venda.id_item,
            subtotal: venda.subtotal,
            frete: venda.frete,
            total: venda.total,
            forma_pagamento: venda.forma_pagamento,
            parcelas: venda.parcelas,
            data_criacao: Utils.getDataHora(),
        }).then(function (Venda) {
            console.log("[BD]: Venda inserida com sucesso!")
            return Venda.id;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao inserir! => ' + erro)
            return false;
        });
    }

    alterar(dados) {
        return Venda.update({ id_cliente: dados.id_cliente, id_item: dados.id_item, subtotal: dados.subtotal, frete: dados.frete, total: dados.total,
            forma_pagamento: dados.forma_pagamento, parcelas: dados.parcelas, data_edicao: Utils.getDataHora(), }, {
            where: {
                id: dados.id
            }
        }).then(function (alterarvenda) {
            console.log("[BD]: Venda alterada com sucesso!")
            return true;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao alterar! => ' + erro)
            return false;
        });
    }



    async buscarTodos(attributes) {
        return Venda.findAll({ attributes });
    }
 
    buscarPorId(id) {
        return Venda.findByPk(id).catch(function (erro) {
            console.log('[BD]: Falha ao buscar! => ' + erro)
            return false;
        })
    }

    deletar(id) {
        return Venda.destroy({
            where: {
                id: id
            }
        }).then(function () {
            console.log("[BD]: Venda excluida com sucesso!")
            return true;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao excluir! => ' + erro)
            return false;
        });

    }
}

module.exports = new VendaDAO();