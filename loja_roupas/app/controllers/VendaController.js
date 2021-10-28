const Yup = require("yup");
const VendaDAO = require("../dao/VendaDAO");
const Utils = require("../helper/Utils");
const Atributos = require("../helper/Atributos");

class VendaController {
	async inserir(req, res) {
		let schema = Yup.object().shape({
			id_cliente: Yup.number().required(),
			id_item: Yup().number().required(),
			subtotal: Yup().number().required(),
			frete: Yup().number().required(),
			total: Yup().number().required(),
			forma_pagamento: Yup().string.required(),
			parcelas: Yup().number().required()
		})
		if (!(await schema.isValid(req.body))) {
			return res.json({ error: true, code: 103, message: "Dados inválidos!" })
		}
		let venda = {
			id_cliente: req.body.id_cliente,
			id_item: req.body.id_item,
			subtotal: req.body.subtotal,
			frete: req.body.frete,
			total: req.body.total,
			forma_pagamento: req.body.forma_pagamento,
			parcelas: req.body.parcelas
		}
		const id_venda = await VendaDAO.inserir(venda);
		return res.json({ error: false, message: "Venda cadastrada com sucesso!" })
	}
	async buscarTodos(req, res) {
		const atributos = Atributos.vendas();
		const vendas = await VendaDAO.buscarTodos(atributos);
		dados.sort((a, b) => a.nome.localeCompare(b.nome))
		if (!vendas) {
			return res.json({ error: true, code: 105, message: "Erro ao buscar todas as vendas" })
		} else {
			return res.json({ error: false, dados: vendas })
		}

	}

	async buscar(req, res) {
		const { id } = req.params;
		const atributos = Atributos.vendas();
		const venda = await VendaDAO.buscarPorId(id, atributos);
		if (!venda) {
			return res.json({ error: true, code: 106, message: "Erro ao buscar a venda" })
		} else {
			return res.json({ error: false, dados: venda })
		}
	}

	
	async alterar(req, res) {
		/// Validação de dados
		const schema = Yup.object().shape({
			id: Yup.number().required(),
			id_cliente: Yup.number().required(),
			id_item: Yup().number().required(),
			subtotal: Yup().number().required(),
			frete: Yup().number().required(),
			total: Yup().number().required(),
			forma_pagamento: Yup().string.required(),
			parcelas: Yup().number().required()
		})
		if (!(await schema.isValid(req.body))) {
			return res.json({ error: true, code: 108, message: "Dados inválidos!" })
		}
		const { id, email } = req.body;

		/// Verifica se venda existe
		const vendaExiste = await VendaDAO.buscarPorId(id);
		if (!vendaExiste) {
			return res.json({ error: true, code: 109, message: "Venda não encontrada" })
		}
		let dados = {
			id: req.body.id,
			id_cliente: req.body.id_cliente,
			id_item: req.body.id_item,
			subtotal: req.body.subtotal,
			frete: req.body.frete,
			total: req.body.total,
			forma_pagamento: req.body.forma_pagamento,
			parcelas: req.body.parcelas
		}
		let cadastro = await VendaDAO.alterar(dados);
		if (!cadastro) { return res.json({ error: true, code: 111, message: "Venda não foi alterada" }) }

		return res.json({ error: false, message: "Venda alterado com sucesso, mas usuário já tinha esse venda " })
	}

	async deletar(req, res) {
		const vendaExiste = await VendaDAO.buscarPorId(req.params.id);
		if (!vendaExiste) {
			return res.json({ error: true, code: 121, message: "Venda não encontrada" })
		}
		const venda = await VendaDAO.deletar(req.params.id, (err) => {
			if (err) return res.json({ error: true, code: 122, message: "Venda não foi excluída" })
		})
		return res.json({ error: false, message: "Venda apagada com sucesso" })
	}

}

module.exports = new VendaController();