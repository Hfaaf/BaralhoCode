#  Jogo Vinte-e-Um (Blackjack)

Este Ã© o projeto de backend para o PWA do jogo **Vinte-e-Um**.\
Ele Ã© construÃ­do com **Node.js**, **Express**, **TypeScript** e
**MongoDB**, e Ã© responsÃ¡vel por gerenciar a autenticaÃ§Ã£o de usuÃ¡rios,
perfis e o placar de pontuaÃ§Ã£o.

------------------------------------------------------------------------

## ðŸš€ Tecnologias Utilizadas

-   **Node.js**
-   **Express** -- Framework da API\
-   **TypeScript** -- Tipagem estÃ¡tica\
-   **MongoDB (Mongoose)** -- Banco de dados NoSQL\
-   **JSON Web Tokens (JWT)** -- Para autenticaÃ§Ã£o de rotas\
-   **bcryptjs** -- Para hashing de senhas\
-   **cors** -- Para permitir requisiÃ§Ãµes do frontend\
-   **dotenv** -- Para gerenciamento de variÃ¡veis de ambiente

------------------------------------------------------------------------

## ðŸ› ï¸ InstalaÃ§Ã£o e ExecuÃ§Ã£o

Siga estes passos para rodar o servidor localmente.

### 1. PrÃ©-requisitos

-   [Node.js](https://nodejs.org/) (versÃ£o 18 ou superior)\
-   [MongoDB](https://www.mongodb.com/try/download/community)\
    (uma instÃ¢ncia local ou um cluster gratuito no [MongoDB
    Atlas](https://www.mongodb.com/cloud/atlas))

### 2. Clone e Instale

``` bash
# 1. Clone o repositÃ³rio (se ainda nÃ£o o fez)
# git clone ...

# 2. Navegue atÃ© a pasta da API
# cd .../Api

# 3. Instale as dependÃªncias
npm install
```

### 3. Crie o arquivo `.env`

VocÃª **PRECISA** criar um arquivo chamado `.env` na raiz desta pasta.\
Este arquivo guarda suas chaves secretas e a conexÃ£o com o banco de
dados.

Copie o conteÃºdo abaixo para o seu arquivo `.env`:

``` bash
# Mude para a sua string de conexÃ£o do MongoDB
# Exemplo local: "mongodb://localhost:27017/vinte-e-um"
# Exemplo Atlas: "mongodb+srv://usuario:senha@cluster.mongodb.net/vinte-e-um"
MONGO_URI=sua_string_de_conexao_mongodb_aqui

# Crie qualquer string longa e secreta para assinar os tokens JWT
JWT_SECRET=seu_segredo_super_secreto_para_jwt

# Porta onde o servidor vai rodar (5000 Ã© um bom padrÃ£o)
PORT=5000
```

### 4. Rode o Servidor

``` bash
# Inicia o servidor em modo de desenvolvimento (com auto-reload)
npm run dev
```

O servidor agora estarÃ¡ rodando em **http://localhost:5000**

------------------------------------------------------------------------

## ðŸ—ºï¸ Endpoints da API

Esta API segue um padrÃ£o **MVC** e fornece os seguintes endpoints:

  -----------------------------------------------------------------------------------
  MÃ©todo         Rota                   DescriÃ§Ã£o             Protegido?
  -------------- ---------------------- --------------------- -----------------------
  `POST`         `/auth/register`       Registra um novo      **NÃ£o**
                                        usuÃ¡rio.              

  `POST`         `/auth/login`          Loga um usuÃ¡rio e     **NÃ£o**
                                        retorna um token JWT. 

  `GET`          `/auth/me`             Busca dados do perfil **Sim**
                                        do usuÃ¡rio logado.    

  `PUT`          `/auth/me`             Atualiza o perfil     **Sim**
                                        (username, foto) do   
                                        usuÃ¡rio logado.       

  `PUT`          `/auth/password`       Atualiza a senha do   **Sim**
                                        usuÃ¡rio logado.       

  `DELETE`       `/auth/me`             Deleta a conta do     **Sim**
                                        usuÃ¡rio logado.       

  `POST`         `/score`               Envia a pontuaÃ§Ã£o de  **Sim**
                                        um jogo (cumulativo). 

  `GET`          `/score/leaderboard`   Retorna o Top 10 do   **NÃ£o**
                                        placar de lÃ­deres.    
  -----------------------------------------------------------------------------------

**Rotas Protegidas** exigem que o **Header** da requisiÃ§Ã£o contenha:

``` bash
Authorization: Bearer seu_token_jwt_aqui
```