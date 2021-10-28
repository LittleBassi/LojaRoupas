const { Router } = require("express");
const multer = require("multer");
const uploadIMG = require("./app/middlewares/uploadImagem");

const UsuarioController = require("./app/controllers/UsuarioController");
const PerfilController = require("./app/controllers/PerfilController");
const MarcaController = require("./app/controllers/MarcaController");
const CategoriaController = require("./app/controllers/CategoriaController");
const TamanhoController = require("./app/controllers/TamanhoController");
const ItemController = require("./app/controllers/ItemController");
const ProdutoController = require("./app/controllers/ProdutoController");
const VendaController = require("./app/controllers/VendaController");


const validarAcesso = require("./app/middlewares/auth");

const routes = new Router();
const uploadImagem = multer(uploadIMG);

routes.get('/', (req, res) => {
    res.send("LojaRoupas")
})


//validarAcesso
// Usuario
routes.get('/usuario/:id', UsuarioController.buscar);
routes.post('/usuario', UsuarioController.inserir);
routes.put('/usuario/editar', UsuarioController.alterar);
routes.delete('/usuario/:id', UsuarioController.deletar);
routes.get('/usuarios', UsuarioController.buscarTodos);

// Perfil
routes.get('/perfil/:id', PerfilController.buscar);
routes.post('/perfil', PerfilController.inserir);
routes.put('/perfil/editar', PerfilController.alterar);
routes.delete('/perfil/:id', PerfilController.deletar);
routes.get('/perfis', PerfilController.buscarTodos);

// Marca
routes.get('/marca/:id', MarcaController.buscar);
routes.post('/marca', MarcaController.inserir);
routes.put('/marca/editar', MarcaController.alterar);
routes.delete('/marca/:id', MarcaController.deletar);
routes.get('/marcas', MarcaController.buscarTodos);

// Categoria
routes.get('/categoria/:id', CategoriaController.buscar);
routes.post('/categoria',  CategoriaController.inserir);
routes.put('/categoria/editar', CategoriaController.alterar);
routes.delete('/categoria/:id', CategoriaController.deletar);
routes.get('/categorias',  CategoriaController.buscarTodos);

// Tamanho
routes.get('/tamanho/:id', TamanhoController.buscar);
routes.post('/tamanho',  TamanhoController.inserir);
routes.put('/tamanho/editar', TamanhoController.alterar);
routes.delete('/tamanho/:id', TamanhoController.deletar);
routes.get('/tamanhos',  TamanhoController.buscarTodos);

// Item
routes.get('/item/:id',  ItemController.buscar);
routes.post('/item',  ItemController.inserir);
routes.put('/item/editar', ItemController.alterar);
routes.delete('/item/:id', ItemController.deletar);
routes.get('/itens',  ItemController.buscarTodos);

// Produto
routes.get('/produto/:id',  ProdutoController.buscar);
routes.post("/produto",  uploadImagem.single('file'), ProdutoController.inserir);
routes.put('/produto/editar', ProdutoController.alterar);
routes.delete('/produto/:id', ProdutoController.deletar);
routes.get('/produtos',  ProdutoController.buscarTodos);

// Vendas
routes.get('/venda/:id', VendaController.buscar);
routes.post("/venda",  VendaController.inserir);
routes.put('/venda/editar', VendaController.alterar);
routes.delete('/venda/:id', VendaController.deletar);
routes.get('/vendas',  VendaController.buscarTodos);


module.exports = routes;
