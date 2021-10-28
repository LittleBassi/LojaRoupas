const Utils = require("../helper/Utils");
const Usuario = require("../models/Usuario");

class UsuarioDAO {

    inserir(usuario) {
        return Usuario.create({
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            cpf: usuario.cpf,
            id_perfil: usuario.id_perfil,
            data_criacao: Utils.getDataHora(),
        }).then(function (Usuario) {
            console.log("[BD]: Usuário inserido com sucesso!")
            return Usuario.id;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao inserir! => ' + erro)
            return false;
        });
    }

    alterar(dados) {
        return Usuario.update({ nome: dados.nome, email: dados.email, senha: dados.senha, cpf: dados.cpf, id_perfil: dados.id_perfil, data_edicao: Utils.getDataHora(), }, {
            where: {
                id: dados.id
            }
        }).then(function (alterarUsuario) {
            console.log("[BD]: Usuário alterado com sucesso!")
            return true;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao alterar! => ' + erro)
            return false;
        });
    }



    async buscarTodos(attributes) {
        return Usuario.findAll({ attributes });
    }
 
    buscarPorId(id) {
        return Usuario.findByPk(id).catch(function (erro) {
            console.log('[BD]: Falha ao buscar! => ' + erro)
            return false;
        })
    }

    deletar(id) {
        return Usuario.destroy({
            where: {
                id: id
            }
        }).then(function () {
            console.log("[BD]: Usuário excluido com sucesso!")
            return true;
        }).catch(function (erro) {
            console.log('[BD]: Falha ao excluir! => ' + erro)
            return false;
        });

    }
}

module.exports = new UsuarioDAO();