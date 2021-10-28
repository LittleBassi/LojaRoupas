const Yup = require("yup");
const MarcaDAO = require("../dao/MarcaDAO");
const Utils = require("../helper/Utils");
const Atributos = require("../helper/Atributos");

class MarcaController {
	async inserir(req, res) {
		let schema = Yup.object().shape({
			nome: Yup.string().required()
		})
		if (!(await schema.isValid(req.body))) {
			return res.json({ error: true, code: 103, message: "Dados inválidos!" })
		}
		let marca = {
			nome: req.body.nome
		}
		const id_marca = await MarcaDAO.inserir(marca);
		return res.json({ error: false, message: "Marca cadastrada com sucesso!" })
	}
	async buscarTodos(req, res) {
		const atributos = Atributos.marcas();
		const marcas = await MarcaDAO.buscarTodos(atributos);
		dados.sort((a, b) => a.nome.localeCompare(b.nome))
		if (!marcas) {
			return res.json({ error: true, code: 105, message: "Erro ao buscar todas as marcas" })
		} else {
			return res.json({ error: false, dados: marcas })
		}

	}

	async buscar(req, res) {
		const { id } = req.params;
		const atributos = Atributos.marcas();
		const marca = await MarcaDAO.buscarPorId(id, atributos);
		if (!marca) {
			return res.json({ error: true, code: 106, message: "Erro ao buscar a marca" })
		} else {
			return res.json({ error: false, dados: marca })
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

		/// Verifica se marca existe
		const marcaExiste = await MarcaDAO.buscarPorId(id);
		if (!marcaExiste) {
			return res.json({ error: true, code: 109, message: "Marca não encontrada" })
		}
		let dados = {
			id: req.body.id,
			nome: req.body.nome
		}
		let cadastro = await MarcaDAO.alterar(dados);
		if (!cadastro) { return res.json({ error: true, code: 111, message: "Marca não foi alterada" }) }

		return res.json({ error: false, message: "Marca alterada com sucesso, mas usuário já tinha esse marca " })
	}

	async deletar(req, res) {
		const marcaExiste = await MarcaDAO.buscarPorId(req.params.id);
		if (!marcaExiste) {
			return res.json({ error: true, code: 121, message: "Marca não encontrada" })
		}
		const marca = await MarcaDAO.deletar(req.params.id, (err) => {
			if (err) return res.json({ error: true, code: 122, message: "Marca não foi excluída" })
		})
		return res.json({ error: false, message: "Marca apagada com sucesso" })
	}

}

module.exports = new MarcaController();