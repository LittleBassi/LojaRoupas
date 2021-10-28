const Yup = require("yup");
const ItemDAO = require("../dao/ItemDAO");
const Utils = require("../helper/Utils");
const Atributos = require("../helper/Atributos");

class ItemController {
	async inserir(req, res) {
		let schema = Yup.object().shape({
			id_produto: Yup.number().required(),
			id_tamanho: Yup().number().required()
		})
		if (!(await schema.isValid(req.body))) {
			return res.json({ error: true, code: 103, message: "Dados inválidos!" })
		}
		let item = {
			id_produto: req.body.id_produto,
			id_tamanho: req.body.id_tamanho
		}
		const id_item = await ItemDAO.inserir(item);
		return res.json({ error: false, message: "Item cadastrado com sucesso!" })
	}
	async buscarTodos(req, res) {
		const atributos = Atributos.items();
		const items = await ItemDAO.buscarTodos(atributos);
		dados.sort((a, b) => a.nome.localeCompare(b.nome))
		if (!items) {
			return res.json({ error: true, code: 105, message: "Erro ao buscar todos os itens" })
		} else {
			return res.json({ error: false, dados: items })
		}

	}

	async buscar(req, res) {
		const { id } = req.params;
		const atributos = Atributos.items();
		const item = await ItemDAO.buscarPorId(id, atributos);
		if (!item) {
			return res.json({ error: true, code: 106, message: "Erro ao buscar o item" })
		} else {
			return res.json({ error: false, dados: item })
		}
	}

	
	async alterar(req, res) {
		/// Validação de dados
		const schema = Yup.object().shape({
			id: Yup.number().required(),
			id_produto: Yup.number().required(),
			id_tamanho: Yup.number().required()
		})
		if (!(await schema.isValid(req.body))) {
			return res.json({ error: true, code: 108, message: "Dados inválidos!" })
		}
		const { id, email } = req.body;

		/// Verifica se item existe
		const itemExiste = await ItemDAO.buscarPorId(id);
		if (!itemExiste) {
			return res.json({ error: true, code: 109, message: "Item não encontrado" })
		}
		let dados = {
			id: req.body.id,
			id_produto: req.body.id_produto,
			id_tamanho: req.body.id_tamanho
		}
		let cadastro = await ItemDAO.alterar(dados);
		if (!cadastro) { return res.json({ error: true, code: 111, message: "Item não foi alterado" }) }

		return res.json({ error: false, message: "Item alterado com sucesso, mas usuário já tinha esse item " })
	}

	async deletar(req, res) {
		const itemExiste = await ItemDAO.buscarPorId(req.params.id);
		if (!itemExiste) {
			return res.json({ error: true, code: 121, message: "Item não encontrado" })
		}
		const item = await ItemDAO.deletar(req.params.id, (err) => {
			if (err) return res.json({ error: true, code: 122, message: "Item não foi excluído" })
		})
		return res.json({ error: false, message: "Item apagado com sucesso" })
	}

}

module.exports = new ItemController();