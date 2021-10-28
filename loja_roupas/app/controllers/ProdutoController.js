const Yup = require("yup");
const ProdutoDAO = require("../dao/ProdutoDAO");
const Utils = require("../helper/Utils");
const Atributos = require("../helper/Atributos");

class ProdutoController {
	async inserir(req, res) {
		let schema = Yup.object().shape({
			nome: Yup.string().required(),
			id_marca: Yup.number().required(),
			id_categoria: Yup.number().required(),
			preco: Yup.number().required()
		})
		if (!(await schema.isValid(req.body))) {
			return res.json({ error: true, code: 103, message: "Dados inválidos!" })
		}
		let produto = {
			nome: req.body.nome,
			id_marca: req.body.id_marca,
			id_categoria: req.body.id_categoria,
			preco: req.body.preco,
			foto_arquivo: req.file? req.file.filename:null,
			foto_original: req.file? req.file.originalname:null
		}
		const id_produto = await ProdutoDAO.inserir(produto);
		return res.json({ error: false, message: "Produto cadastrado com sucesso!" })
	}
	async buscarTodos(req, res) {
		const atributos = Atributos.produtos();
		const produtos = await ProdutoDAO.buscarTodos(atributos);
		dados.sort((a, b) => a.nome.localeCompare(b.nome))
		if (!produtos) {
			return res.json({ error: true, code: 105, message: "Erro ao buscar todos os usuários" })
		} else {
			return res.json({ error: false, dados: produtos })
		}

	}

	async buscar(req, res) {
		const { id } = req.params;
		const atributos = Atributos.produtos();
		const produto = await ProdutoDAO.buscarPorId(id, atributos);
		if (!produto) {
			return res.json({ error: true, code: 106, message: "Erro ao buscar o usuário" })
		} else {
			return res.json({ error: false, dados: produto })
		}
	}

	
	async alterar(req, res) {
		/// Validação de dados
		const schema = Yup.object().shape({
			id: Yup.number().required(),
			nome: Yup.string().required(),
			id_marca: Yup.number().required(),
			id_categoria: Yup.number().required(),
			preco: Yup.number().required()
		})
		if (!(await schema.isValid(req.body))) {
			return res.json({ error: true, code: 108, message: "Dados inválidos!" })
		}
		const { id, email } = req.body;

		/// Verifica se produto existe
		const produtoExiste = await ProdutoDAO.buscarPorId(id);
		if (!produtoExiste) {
			return res.json({ error: true, code: 109, message: "Produto não encontrado" })
		}
		let dados = {
			id: req.body.id,
			nome: req.body.nome,
			id_marca: req.body.id_marca,
			id_categoria: req.body.id_categoria,
			preco: req.body.preco,
			foto_arquivo: req.file? req.file.filename:null,
			foto_original: req.file? req.file.originalname:null
		}
		let cadastro = await ProdutoDAO.alterar(dados);
		if (!cadastro) { return res.json({ error: true, code: 111, message: "Produto não foi alterado" }) }

		return res.json({ error: false, message: "Produto alterado com sucesso, mas usuário já tinha esse produto " })
	}

	async deletar(req, res) {
		const produtoExiste = await ProdutoDAO.buscarPorId(req.params.id);
		if (!produtoExiste) {
			return res.json({ error: true, code: 121, message: "Produto não encontrado" })
		}
		const produto = await ProdutoDAO.deletar(req.params.id, (err) => {
			if (err) return res.json({ error: true, code: 122, message: "Produto não foi excluído" })
		})
		return res.json({ error: false, message: "Produto apagado com sucesso" })
	}

}

module.exports = new ProdutoController();