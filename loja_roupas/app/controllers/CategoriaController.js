const Yup = require("yup");
const CategoriaDAO = require("../dao/CategoriaDAO");
const Utils = require("../helper/Utils");
const Atributos = require("../helper/Atributos");

class CategoriaController {
	async inserir(req, res) {
		let schema = Yup.object().shape({
			nome: Yup.string().required()
		})
		if (!(await schema.isValid(req.body))) {
			return res.json({ error: true, code: 103, message: "Dados inválidos!" })
		}
		let categoria = {
			nome: req.body.nome
		}
		const id_categoria = await CategoriaDAO.inserir(categoria);
		return res.json({ error: false, message: "Categoria cadastrada com sucesso!" })
	}
	async buscarTodos(req, res) {
		const atributos = Atributos.categorias();
		const categorias = await CategoriaDAO.buscarTodos(atributos);
		dados.sort((a, b) => a.nome.localeCompare(b.nome))
		if (!categorias) {
			return res.json({ error: true, code: 105, message: "Erro ao buscar todas as categorias" })
		} else {
			return res.json({ error: false, dados: categorias })
		}

	}

	async buscar(req, res) {
		const { id } = req.params;
		const atributos = Atributos.categorias();
		const categoria = await CategoriaDAO.buscarPorId(id, atributos);
		if (!categoria) {
			return res.json({ error: true, code: 106, message: "Erro ao buscar a categoria" })
		} else {
			return res.json({ error: false, dados: categoria })
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

		/// Verifica se categoria existe
		const categoriaExiste = await CategoriaDAO.buscarPorId(id);
		if (!categoriaExiste) {
			return res.json({ error: true, code: 109, message: "Categoria não encontrada" })
		}
		let dados = {
			id: req.body.id,
			nome: req.body.nome
		}
		let cadastro = await CategoriaDAO.alterar(dados);
		if (!cadastro) { return res.json({ error: true, code: 111, message: "Categoria não foi alterada" }) }

		return res.json({ error: false, message: "Categoria alterado com sucesso, mas usuário já tinha esse categoria " })
	}

	async deletar(req, res) {
		const categoriaExiste = await CategoriaDAO.buscarPorId(req.params.id);
		if (!categoriaExiste) {
			return res.json({ error: true, code: 121, message: "Categoria não encontrada" })
		}
		const categoria = await CategoriaDAO.deletar(req.params.id, (err) => {
			if (err) return res.json({ error: true, code: 122, message: "Categoria não foi excluída" })
		})
		return res.json({ error: false, message: "Categoria apagada com sucesso" })
	}

}

module.exports = new CategoriaController();