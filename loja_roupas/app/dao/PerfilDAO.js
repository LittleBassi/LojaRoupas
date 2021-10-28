const Utils = require("../helper/Utils");
const Perfil = require("../models/Perfil");

class PerfilDAO {

    inserir(perfil) {
        return Perfil.create({
            nome: perfil.nome,
            data_criacao: Utils.getDataHora(),
        }).then(function (Perfil) {
            console.log("[BD]: Perfil inserido com sucesso!")
            return Perfil.id;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao inserir! => ' + erro)
            return false;
        });
    }

    alterar(dados) {
        return Perfil.update({ nome: dados.nome, data_edicao: Utils.getDataHora(), }, {
            where: {
                id: dados.id
            }
        }).then(function (alterarPerfil) {
            console.log("[BD]: Perfil alterado com sucesso!")
            return true;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao alterar! => ' + erro)
            return false;
        });
    }



    async buscarTodos(attributes) {
        return Perfil.findAll({ attributes });
    }
 
    buscarPorId(id) {
        return Perfil.findByPk(id).catch(function (erro) {
            console.log('[BD]: Falha ao buscar! => ' + erro)
            return false;
        })
    }

    deletar(id) {
        return Perfil.destroy({
            where: {
                id: id
            }
        }).then(function () {
            console.log("[BD]: Perfil excluido com sucesso!")
            return true;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao excluir! => ' + erro)
            return false;
        });

    }
}

module.exports = new PerfilDAO();