###  template server
Evolução Server em Node JS.

## Estrutura da API
{
    "error": true|false
    "dados": array
}

### Criar o arquivo package
- npm init -y

### Gerencia as requisições, rotas e URLs, entre outra funcionalidades
- npm install express

### Instalar o módulo para reiniciar o servidor sempre que houver alteração no código fonte
- npm install -D nodemon

### Produz código JS válido - para import do ES6
- npm install -D sucrase

### Iniciar o servidor
- npm rum dev

### Instalar as dependencias
- npm install

### Instalar o Mysql
- npm install --save mysql2

### Instalar o Sequelize - Sequelize facilita as conexões e a busca dos dados
- npm install --save sequelize

### validar campo
- npm install --save yup

### Instalar o módulo para criptografar a senha
- npm install --save bcryptjs

### Instalar a dependencia para JWT
- npm install --save jsonwebtoken

### Instalar a dependencia para Imagens, MULTER
- npm install --save multer



## LIBERAR VERBOS NO SERVIDOR
- Acesse o link https://help.catchsoftware.com/pages/viewpage.action?pageId=2031718#:~:text=Resolution%20%232%20-%20Allow%20the%20%22DELETE%22%20verb&text=On%20the%20Request%20Filtering%20page,allowed%20will%20fix%20the%20issue.
1. Excluir WebDAVModule 
2. Permitir PUT and DELETE
