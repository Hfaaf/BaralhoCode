<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>README - API Vinte-e-Um</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            background-color: #f6f8fa;
            color: #24292e;
        }
        h1, h2, h3 {
            border-bottom: 1px solid #eaecef;
            padding-bottom: 0.3em;
        }
        h1 { font-size: 2.5em; }
        h2 { font-size: 2em; }
        h3 { font-size: 1.5em; }
        code {
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
            background-color: #f0f0f0;
            padding: 0.2em 0.4em;
            margin: 0;
            font-size: 85%;
            border-radius: 6px;
        }
        pre {
            background-color: #24292e;
            color: #f6f8fa;
            padding: 16px;
            overflow: auto;
            border-radius: 6px;
        }
        pre code {
            background-color: transparent;
            padding: 0;
            font-size: 100%;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 1em;
            margin-bottom: 1em;
        }
        th, td {
            border: 1px solid #dfe2e5;
            padding: 8px 12px;
        }
        th {
            background-color: #f6f8fa;
            font-weight: 600;
        }
        ul {
            padding-left: 20px;
        }
        hr {
            height: 0.25em;
            padding: 0;
            margin: 24px 0;
            background-color: #e1e4e8;
            border: 0;
        }
    </style>
</head>
<body>
    <h1>API do Jogo Vinte-e-Um (Blackjack)</h1>
    <p>Este é o projeto de backend para o PWA do jogo Vinte-e-Um. Ele é construído com Node.js, Express, TypeScript e MongoDB, e é responsável por gerenciar a autenticação de usuários, perfis e o placar de pontuação.</p>
    
    <hr>
    
    <h2>🚀 Tecnologias Utilizadas</h2>
    <ul>
        <li><strong>Node.js</strong></li>
        <li><strong>Express</strong> - Framework da API</li>
        <li><strong>TypeScript</strong> - Tipagem estática</li>
        <li><strong>MongoDB (Mongoose)</strong> - Banco de dados NoSQL</li>
        <li><strong>JSON Web Tokens (JWT)</strong> - Para autenticação de rotas</li>
        <li><strong>bcryptjs</strong> - Para hashing de senhas</li>
        <li><strong>cors</strong> - Para permitir requisições do frontend</li>
        <li><strong>dotenv</strong> - Para gerenciamento de variáveis de ambiente</li>
    </ul>
    
    <hr>
    
    <h2>🛠️ Instalação e Execução</h2>
    <p>Siga estes passos para rodar o servidor localmente.</p>
    
    <h3>1. Pré-requisitos</h3>
    <ul>
        <li><a href="https://nodejs.org/">Node.js</a> (versão 18 ou superior)</li>
        <li><a href="https://www.mongodb.com/try/download/community">MongoDB</a> (uma instância local ou um cluster gratuito no <a href="https://www.mongodb.com/cloud/atlas">MongoDB Atlas</a>)</li>
    </ul>
    
    <h3>2. Clone e Instale</h3>
    <pre><code># 1. Clone o repositório (se ainda não o fez)
# git clone ...

# 2. Navegue até a pasta da API
# cd .../Api

# 3. Instale as dependências
npm install
</code></pre>
    
    <h3>3. Crie o arquivo .env</h3>
    <p>Você <strong>PRECISA</strong> criar um arquivo chamado <code>.env</code> na raiz desta pasta. Este arquivo guarda suas chaves secretas e a conexão com o banco de dados.</p>
    <p>Copie o conteúdo abaixo para o seu arquivo <code>.env</code>:</p>
    <pre><code># Mude para a sua string de conexão do MongoDB
# Exemplo local: "mongodb://localhost:27017/vinte-e-um"
# Exemplo Atlas: "mongodb+srv://usuario:senha@cluster.mongodb.net/vinte-e-um"
MONGO_URI=sua_string_de_conexao_mongodb_aqui

# Crie qualquer string longa e secreta para assinar os tokens JWT
JWT_SECRET=seu_segredo_super_secreto_para_jwt

# Porta onde o servidor vai rodar (5000 é um bom padrão)
PORT=5000
</code></pre>
    
    <h3>4. Rode o Servidor</h3>
    <pre><code># Inicia o servidor em modo de desenvolvimento (com auto-reload)
npm run dev
</code></pre>
    <p>O servidor agora estará rodando em <code>http://localhost:5000</code>.</p>
    
    <hr>
    
    <h2>🗺️ Endpoints da API</h2>
    <p>Esta API segue um padrão MVC e fornece os seguintes endpoints:</p>
    
    <table>
        <thead>
            <tr>
                <th>Método</th>
                <th>Rota</th>
                <th>Descrição</th>
                <th>Protegido?</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>POST</code></td>
                <td><code>/auth/register</code></td>
                <td>Registra um novo usuário.</td>
                <td><strong>Não</strong></td>
            </tr>
            <tr>
                <td><code>POST</code></td>
                <td><code>/auth/login</code></td>
                <td>Loga um usuário e retorna um token JWT.</td>
                <td><strong>Não</strong></td>
            </tr>
            <tr>
                <td><code>GET</code></td>
                <td><code>/auth/me</code></td>
                <td>Busca dados do perfil do usuário logado.</td>
                <td><strong>Sim</strong></td>
            </tr>
            <tr>
                <td><code>PUT</code></td>
                <td><code>/auth/me</code></td>
                <td>Atualiza o perfil (username, foto) do usuário logado.</td>
                <td><strong>Sim</strong></td>
            </tr>
            <tr>
                <td><code>PUT</code></td>
                <td><code>/auth/password</code></td>
                <td>Atualiza a senha do usuário logado.</td>
                <td><strong>Sim</strong></td>
            </tr>
            <tr>
                <td><code>DELETE</code></td>
                <td><code>/auth/me</code></td>
                <td>Deleta a conta do usuário logado.</td>
                <td><strong>Sim</strong></td>
            </tr>
            <tr>
                <td><code>POST</code></td>
                <td><code>/score</code></td>
                <td>Envia a pontuação de um jogo (cumulativo).</td>
                <td><strong>Sim</strong></td>
            </tr>
            <tr>
                <td><code>GET</code></td>
                <td><code>/score/leaderboard</code></td>
                <td>Retorna o Top 10 do placar de líderes.</td>
                <td><strong>Não</strong></td>
            </tr>
        </tbody>
    </table>
    
    <p><strong>Rotas Protegidas</strong> exigem que o <code>Header</code> da requisição contenha:<br>
    <code>Authorization: Bearer seu_token_jwt_aqui</code></p>
    
</body>
</html>