const Utils = require("../helper/Utils");
const Categoria = require("../models/Categoria");

class CategoriaDAO {

    inserir(categoria) {
        return Categoria.create({
            nome: categoria.nome,
            data_criacao: Utils.getDataHora(),
        }).then(function (Categoria) {
            console.log("[BD]: Categoria inserido com sucesso!")
            return Categoria.id;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao inserir! => ' + erro)
            return false;
        });
    }

    alterar(dados) {
        return Categoria.update({ nome: dados.nome, data_edicao: Utils.getDataHora(), }, {
            where: {
                id: dados.id
            }
        }).then(function (alterarCategoria) {
            console.log("[BD]: Categoria alterado com sucesso!")
            return true;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao alterar! => ' + erro)
            return false;
        });
    }



    async buscarTodos(attributes) {
        return Categoria.findAll({ attributes });
    }
 
    buscarPorId(id) {
        return Categoria.findByPk(id).catch(function (erro) {
            console.log('[BD]: Falha ao buscar! => ' + erro)
            return false;
        })
    }

    deletar(id) {
        return Categoria.destroy({
            where: {
                id: id
            }
        }).then(function () {
            console.log("[BD]: Categoria excluido com sucesso!")
            return true;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao excluir! => ' + erro)
            return false;
        });

    }
}

module.exports = new CategoriaDAO();