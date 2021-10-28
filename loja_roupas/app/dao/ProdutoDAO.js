const Utils = require("../helper/Utils");
const Produto = require("../models/Produto");

class ProdutoDAO {

    inserir(produto) {
        return Produto.create({
            nome: produto.nome,
            id_marca: produto.id_marca,
            id_categoria: produto.id_categoria,
            preco: produto.preco,
            foto_arquivo: produto.foto_arquivo,
            foto_original: produto.foto_original,
            data_criacao: Utils.getDataHora(),
        }).then(function (Produto) {
            console.log("[BD]: Produto inserido com sucesso!")
            return Produto.id;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao inserir! => ' + erro)
            return false;
        });
    }

    alterar(dados) {
        return Produto.update({ nome: dados.nome, id_marca: dados.id_marca, id_categoria: dados.id_categoria, preco: dados.preco, foto_arquivo: dados.foto_arquivo, 
            foto_original: dados.foto_original, data_edicao: Utils.getDataHora(), }, {
            where: {
                id: dados.id
            }
        }).then(function (alterarproduto) {
            console.log("[BD]: Produto alterado com sucesso!")
            return true;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao alterar! => ' + erro)
            return false;
        });
    }



    async buscarTodos(attributes) {
        return Produto.findAll({ attributes });
    }
 
    buscarPorId(id) {
        return Produto.findByPk(id).catch(function (erro) {
            console.log('[BD]: Falha ao buscar! => ' + erro)
            return false;
        })
    }

    deletar(id) {
        return Produto.destroy({
            where: {
                id: id
            }
        }).then(function () {
            console.log("[BD]: Produto excluido com sucesso!")
            return true;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao excluir! => ' + erro)
            return false;
        });

    }
}

module.exports = new ProdutoDAO();