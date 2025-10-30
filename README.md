# 🃏 Jogo Vinte-e-Um (Blackjack)

Este é o projeto de backend para o **PWA do jogo Vinte-e-Um**.  
Ele é construído com **Node.js**, **Express**, **TypeScript** e **MongoDB**, sendo responsável por gerenciar **autenticação de usuários**, **perfis** e o **placar de pontuação**.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express** – Framework da API
- **TypeScript** – Tipagem estática
- **MongoDB (Mongoose)** – Banco de dados NoSQL
- **JSON Web Tokens (JWT)** – Autenticação de rotas
- **bcryptjs** – Hashing de senhas
- **cors** – Permitir requisições do frontend
- **dotenv** – Gerenciamento de variáveis de ambiente

---

## 🛠️ Instalação e Execução

Siga estes passos para rodar o servidor localmente:

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)  
- [MongoDB](https://www.mongodb.com/try/download/community) (instância local ou [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### 2. Clone e Instale

```bash
# 1. Clone o repositório
git clone https://github.com/Hfaaf/vinte-e-um.git

# 2. Acesse a pasta da API
cd vinte-e-um/Api

# 3. Instale as dependências
npm install

3. Crie o arquivo .env

Você precisa criar um arquivo chamado .env na raiz da API.
Copie e edite o conteúdo abaixo:

# Conexão com MongoDB
# Exemplo local: "mongodb://localhost:27017/vinte-e-um"
# Exemplo Atlas: "mongodb+srv://usuario:senha@cluster.mongodb.net/vinte-e-um"
MONGO_URI=sua_string_de_conexao_mongodb_aqui

# Chave secreta JWT
JWT_SECRET=seu_segredo_super_secreto_para_jwt

# Porta padrão
PORT=5000

4. Rode o Servidor

# Inicia o servidor em modo de desenvolvimento
npm run dev

O servidor estará disponível em:
👉 http://localhost:5000


---

🗺️ Endpoints da API

Esta API segue o padrão MVC e possui os seguintes endpoints:

Método	Rota	Descrição	Protegido

POST	/auth/register	Registra um novo usuário.	❌
POST	/auth/login	Loga um usuário e retorna um token JWT.	❌
GET	/auth/me	Retorna os dados do perfil logado.	✅
PUT	/auth/me	Atualiza username/foto do perfil logado.	✅
PUT	/auth/password	Atualiza a senha do usuário logado.	✅
DELETE	/auth/me	Deleta a conta do usuário logado.	✅
POST	/score	Envia a pontuação de um jogo.	✅
GET	/score/leaderboard	Retorna o Top 10 do placar de líderes.	❌
