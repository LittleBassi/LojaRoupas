const Yup = require("yup");
const TamanhoDAO = require("../dao/TamanhoDAO");
const Utils = require("../helper/Utils");
const Atributos = require("../helper/Atributos");

class TamanhoController {
	async inserir(req, res) {
		let schema = Yup.object().shape({
			nome: Yup.string().required()
		})
		if (!(await schema.isValid(req.body))) {
			return res.json({ error: true, code: 103, message: "Dados inválidos!" })
		}
		let tamanho = {
			nome: req.body.nome
		}
		const id_tamanho = await TamanhoDAO.inserir(tamanho);
		return res.json({ error: false, message: "Tamanho cadastrado com sucesso!" })
	}
	async buscarTodos(req, res) {
		const atributos = Atributos.tamanhos();
		const tamanhos = await TamanhoDAO.buscarTodos(atributos);
		dados.sort((a, b) => a.nome.localeCompare(b.nome))
		if (!tamanhos) {
			return res.json({ error: true, code: 105, message: "Erro ao buscar todos os tamanhos" })
		} else {
			return res.json({ error: false, dados: tamanhos })
		}

	}

	async buscar(req, res) {
		const { id } = req.params;
		const atributos = Atributos.tamanhos();
		const tamanho = await TamanhoDAO.buscarPorId(id, atributos);
		if (!tamanho) {
			return res.json({ error: true, code: 106, message: "Erro ao buscar o tamanho" })
		} else {
			return res.json({ error: false, dados: tamanho })
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

		/// Verifica se tamanho existe
		const tamanhoExiste = await TamanhoDAO.buscarPorId(id);
		if (!tamanhoExiste) {
			return res.json({ error: true, code: 109, message: "Tamanho não encontrado" })
		}
		let dados = {
			id: req.body.id,
			nome: req.body.nome
		}
		let cadastro = await TamanhoDAO.alterar(dados);
		if (!cadastro) { return res.json({ error: true, code: 111, message: "Tamanho não foi alterado" }) }

		return res.json({ error: false, message: "Tamanho alterado com sucesso, mas usuário já tinha esse tamanho " })
	}

	async deletar(req, res) {
		const tamanhoExiste = await TamanhoDAO.buscarPorId(req.params.id);
		if (!tamanhoExiste) {
			return res.json({ error: true, code: 121, message: "Tamanho não encontrado" })
		}
		const tamanho = await TamanhoDAO.deletar(req.params.id, (err) => {
			if (err) return res.json({ error: true, code: 122, message: "Tamanho não foi excluído" })
		})
		return res.json({ error: false, message: "Tamanho apagado com sucesso" })
	}

}

module.exports = new TamanhoController();