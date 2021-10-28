const Yup = require("yup");
const bcrypt = require("bcryptjs");
const UsuarioDAO = require("../dao/UsuarioDAO");
const Utils = require("../helper/Utils");
const Atributos = require("../helper/Atributos");

class UsuarioController {
	async inserir(req, res) {
		let schema = Yup.object().shape({
			nome: Yup.string().required(),
			email: Yup.string().required(),
			cpf: Yup.string().required(),
			senha: Yup.string().required(),
			id_perfil: Yup.number().required()
		})
		if (!(await schema.isValid(req.body))) {
			return res.json({ error: true, code: 103, message: "Dados inválidos!" })
		}
		let usuario = {
			id_perfil: req.body.id_perfil,
			nome: req.body.nome,
			email: req.body.email,
			senha: await bcrypt.hash(req.body.senha, 8),
			cpf: req.body.cpf
		}
		const id_usuario = await UsuarioDAO.inserir(usuario);
		return res.json({ error: false, message: "Usuário cadastrado com sucesso!" })
	}
	async buscarTodos(req, res) {
		const atributos = Atributos.usuarios();
		const usuarios = await UsuarioDAO.buscarTodos(atributos);
		dados.sort((a, b) => a.nome.localeCompare(b.nome))
		if (!usuarios) {
			return res.json({ error: true, code: 105, message: "Erro ao buscar todos os usuários" })
		} else {
			return res.json({ error: false, dados: usuarios })
		}

	}

	async buscar(req, res) {
		const { id } = req.params;
		const atributos = Atributos.usuarios();
		const usuario = await UsuarioDAO.buscarPorId(id, atributos);
		if (!usuario) {
			return res.json({ error: true, code: 106, message: "Erro ao buscar o usuário" })
		} else {
			return res.json({ error: false, dados: usuario })
		}
	}

	
	async alterar(req, res) {
		/// Validação de dados
		const schema = Yup.object().shape({
			id: Yup.number().required(),
			nome: Yup.string().required(),
			email: Yup.string().required(),
			cpf: Yup.string().required(),
			senha: Yup.string().required(),
			id_perfil: Yup.string().required()
		})
		if (!(await schema.isValid(req.body))) {
			return res.json({ error: true, code: 108, message: "Dados inválidos!" })
		}
		const { id, email } = req.body;

		/// Verifica se usuario existe
		const usuarioExiste = await UsuarioDAO.buscarPorId(id);
		if (!usuarioExiste) {
			return res.json({ error: true, code: 109, message: "Usuário não encontrado" })
		}
		/// Verifica se não existe o mesmo email
		if (email != usuarioExiste.email) {
			const emailExiste = await UsuarioDAO.buscar(email);
			if (emailExiste) {
				return res.json({ error: true, code: 110, message: "E-mail já cadastrado" })
			}
		}
		let dados = {
			id: req.body.id,
			nome: req.body.nome,
			cpf: req.body.cpf,
			senha: req.body.senha,
			id_perfil: req.body.id_perfil,
			email: req.body.email,
		}
		let cadastro = await UsuarioDAO.alterar(dados);
		if (!cadastro) { return res.json({ error: true, code: 111, message: "Usuário não foi alterado" }) }

		return res.json({ error: false, message: "Usuário alterado com sucesso, mas usuário já tinha esse perfil " })
	}

	async deletar(req, res) {
		const usuarioExiste = await UsuarioDAO.buscarPorId(req.params.id);
		if (!usuarioExiste) {
			return res.json({ error: true, code: 121, message: "Usuário não encontrado" })
		}
		const usuario = await UsuarioDAO.deletar(req.params.id, (err) => {
			if (err) return res.json({ error: true, code: 122, message: "Usuário não foi excluído" })
		})
		return res.json({ error: false, message: "Usuário apagado com sucesso" })
	}

}

module.exports = new UsuarioController();