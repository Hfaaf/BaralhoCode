# Vinte-e-Um (Blackjack)

![React](https://img.shields.io/badge/React-18.2.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC) ![API](https://img.shields.io/badge/API-Deck_of_Cards-green)

> Um jogo de Blackjack (Vinte-e-Um) desenvolvido em React com design responsivo e três níveis de dificuldade para a IA.

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar](#como-executar)
  - [Pré-requisitos](#pré-requisitos)
  - [Instalação e Execução](#instalação-e-execução)
  - [Build para Produção](#build-para-produção)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Componentes](#componentes)
- [Regras do Jogo](#regras-do-jogo)
- [Níveis de Dificuldade da IA](#níveis-de-dificuldade-da-ia)
- [API Utilizada](#api-utilizada)
- [Responsividade](#responsividade)
- [Autor](#autor)

---

## 🎯 Visão Geral

Vinte-e-Um é uma implementação web do clássico jogo de cartas Blackjack, onde o objetivo é obter uma pontuação mais alta que o dealer sem ultrapassar 21 pontos. O projeto foi desenvolvido como parte da atividade **"Meu primeiro web app conectado"**.

---

## ⚡ Funcionalidades

- ✅ Jogo de Blackjack completo com todas as regras tradicionais
- ✅ Três níveis de dificuldade para a IA (Iniciante, Intermediário, Avançado)
- ✅ Design responsivo que se adapta a dispositivos móveis e desktop
- ✅ Interface intuitiva com cartas visuais
- ✅ Sistema de pontuação automático com tratamento especial para Ases
- ✅ Tutorial completo de como jogar
- ✅ Animações e feedback visual
- ✅ Controles de jogo intuitivos

---

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Tailwind CSS** - Framework CSS para estilização
- **Deck of Cards API** - API externa para gerenciamento de baralhos
- **React Icons** - Biblioteca de ícones
- **Vite** - Ferramenta de build e desenvolvimento

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação e Execução

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Acesse o diretório do projeto:

```bash
cd vinte-e-um
```

Instale as dependências:

```bash
npm install
# ou
# yarn install
```

Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
# ou
# yarn dev
```

Abra o navegador e acesse:

```
http://localhost:5173
```

Ou acesse:

```bash
https://vinte-e-um.vercel.app/
```

### Build para Produção

```bash
npm run build
# ou
# yarn build
```

---

## 📁 Estrutura do Projeto

```
src/
├── App.jsx                 # Componente principal e roteamento
├── main.jsx                # Ponto de entrada da aplicação
├── index.css               # Estilos globais e importação do Tailwind
├── components/
│   ├── Nav.jsx             # Componente de navegação
│   ├── Jogar.jsx           # Página principal do jogo
│   ├── ComoJogar.jsx       # Página com instruções
│   └── Footer.jsx          # Rodapé da aplicação
```

---

## 🧩 Componentes

### App.jsx

Componente principal que gerencia o estado da aplicação e a navegação entre páginas.

### Nav.jsx

Barra de navegação superior com links para as páginas **"Jogar"** e **"Como Jogar"**.

### Jogar.jsx

Página principal do jogo, contendo:

- Seleção de nível de dificuldade
- Mesa de jogo com cartas do jogador e dealer
- Controles de jogo (Pegar carta, Parar, Jogar Novamente)
- Lógica completa do jogo

### ComoJogar.jsx

Página com instruções detalhadas sobre as regras do jogo e como jogar.

### Footer.jsx

Rodapé com informações do autor e link para a API utilizada.

---

## 🎮 Regras do Jogo

- O objetivo é ter uma pontuação maior que a do dealer sem ultrapassar 21 pontos
- Cartas numéricas valem seu valor facial
- Figuras (J, Q, K) valem 10 pontos
- O Ás vale 1 ou 11 pontos, dependendo do que for melhor para a mão
- O jogador recebe duas cartas inicialmente
- O dealer recebe duas cartas, sendo uma virada para baixo
- O jogador pode **Pegar carta** (receber mais cartas) ou **Parar** (manter a pontuação atual)
- Se o jogador ultrapassar 21 pontos, perde automaticamente
- Após o jogador parar, o dealer revela sua carta e joga de acordo com o nível de dificuldade

---

## 🧠 Níveis de Dificuldade da IA

**Iniciante**

- O dealer para de comprar cartas ao atingir **17 pontos** ou mais

**Intermediário**

- O dealer para de comprar cartas ao atingir **18 pontos** ou mais

**Avançado**

- O dealer para de comprar cartas ao atingir **19 pontos** ou mais

---

## 🔌 API Utilizada

O projeto utiliza a **Deck of Cards API** para:

- Criar e embaralhar baralhos
- Distribuir cartas para jogador e dealer
- Gerenciar o estado do baralho durante o jogo

Link: https://deckofcardsapi.com/

---

## 📱 Responsividade

O jogo foi desenvolvido com foco em responsividade, funcionando perfeitamente em:

- Dispositivos móveis (smartphones)
- Tablets
- Desktop

Todos os elementos se adaptam automaticamente ao tamanho da tela, garantindo uma experiência consistente em qualquer dispositivo.

---

## 👨‍💻 Autor

**Heitor Farias**  
GitHub: **Hfaaf**  
Projeto: **Vinte-e-um**

---

Desenvolvido como parte da atividade "Meu primeiro web app conectado".
