const Yup = require("yup");
const PerfilDAO = require("../dao/PerfilDAO");
const Utils = require("../helper/Utils");
const Atributos = require("../helper/Atributos");

class PerfilController {
	async inserir(req, res) {
		let schema = Yup.object().shape({
			nome: Yup.string().required()
		})
		if (!(await schema.isValid(req.body))) {
			return res.json({ error: true, code: 103, message: "Dados inválidos!" })
		}
		let perfil = {
			nome: req.body.nome
		}
		const id_perfil = await PerfilDAO.inserir(perfil);
		return res.json({ error: false, message: "Perfil cadastrado com sucesso!" })
	}
	async buscarTodos(req, res) {
		const atributos = Atributos.perfils();
		const perfils = await PerfilDAO.buscarTodos(atributos);
		dados.sort((a, b) => a.nome.localeCompare(b.nome))
		if (!perfils) {
			return res.json({ error: true, code: 105, message: "Erro ao buscar todos os perfis" })
		} else {
			return res.json({ error: false, dados: perfils })
		}

	}

	async buscar(req, res) {
		const { id } = req.params;
		const atributos = Atributos.perfils();
		const perfil = await PerfilDAO.buscarPorId(id, atributos);
		if (!perfil) {
			return res.json({ error: true, code: 106, message: "Erro ao buscar o perfil" })
		} else {
			return res.json({ error: false, dados: perfil })
		}
	}

	
	async alterar(req, res) {
		/// Validação de dados
		const schema = Yup.object().shape({
			id: Yup.number().required(),
			nome: Yup.string().required()
		})
		if (!(await schema.isValid(req.body))) {
			return res.json({ error: true, code: 108, message: "Dados inválidos!" })
		}
		const { id, email } = req.body;

		/// Verifica se perfil existe
		const perfilExiste = await PerfilDAO.buscarPorId(id);
		if (!perfilExiste) {
			return res.json({ error: true, code: 109, message: "Perfil não encontrado" })
		}
		let dados = {
			id: req.body.id,
			nome: req.body.nome
		}
		let cadastro = await PerfilDAO.alterar(dados);
		if (!cadastro) { return res.json({ error: true, code: 111, message: "Perfil não foi alterado" }) }

		return res.json({ error: false, message: "Perfil alterado com sucesso, mas usuário já tinha esse perfil " })
	}

	async deletar(req, res) {
		const perfilExiste = await PerfilDAO.buscarPorId(req.params.id);
		if (!perfilExiste) {
			return res.json({ error: true, code: 121, message: "Perfil não encontrado" })
		}
		const perfil = await PerfilDAO.deletar(req.params.id, (err) => {
			if (err) return res.json({ error: true, code: 122, message: "Perfil não foi excluído" })
		})
		return res.json({ error: false, message: "Perfil apagado com sucesso" })
	}

}

module.exports = new PerfilController();