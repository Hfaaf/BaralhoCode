import { useState } from "react";
import { GiCardAceSpades } from "react-icons/gi";
import { FaTrophy, FaFrown } from "react-icons/fa";

import * as api from '../apiService'

const IA_LEVELS = [
  { label: "Iniciante", value: "easy" },
  { label: "Intermediário", value: "medium" },
  { label: "Avançado", value: "hard" },
];

const API = "https://deckofcardsapi.com/api/deck";

function score(cards) {
  let score = 0;
  let aces = 0;
  cards.forEach(card => {
    if (["KING", "QUEEN", "JACK"].includes(card.value)) score += 10;
    else if (card.value === "ACE") {
      score += 11;
      aces += 1;
    } else score += Number(card.value);
  });
  while (score > 21 && aces) {
    score -= 10;
    aces -= 1;
  }
  return score;
}

export default function Jogar() {
  const [dealerPlaying, setDealerPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [iaLevel, setIaLevel] = useState(null);
  const [started, setStarted] = useState(false);
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [turn, setTurn] = useState("player");
  const [revealDealer, setRevealDealer] = useState(false);
  const [playerStopped, setPlayerStopped] = useState(false);
  const [modalPoints, setModalPoints] = useState(null);
  const [modalNegativePoints, setModalNegativePoints] = useState(null)

  function resetGame() {
    setStarted(false);
    setGameOver(false);
    setMessage("");
    setDeckId(null);
    setPlayerCards([]);
    setDealerCards([]);
    setTurn("player");
    setRevealDealer(false);
    setPlayerStopped(false);
    setDealerPlaying(false);
    setIaLevel(null);
    setModalPoints(null);
    setModalNegativePoints(null)
  }

  async function startGame() {
    setLoading(true);
    setStarted(true);
    setGameOver(false);
    setMessage("");
    setRevealDealer(false);
    setTurn("player");
    setPlayerStopped(false);
    const deckRes = await fetch(`${API}/new/shuffle/?deck_count=1`);
    const deckData = await deckRes.json();
    setDeckId(deckData.deck_id);

    const playerRes = await fetch(`${API}/${deckData.deck_id}/draw/?count=2`);
    const dealerRes = await fetch(`${API}/${deckData.deck_id}/draw/?count=2`);
    const playerData = await playerRes.json();
    const dealerData = await dealerRes.json();
    setPlayerCards(playerData.cards);
    setDealerCards(dealerData.cards);
    setLoading(false);
  }

  async function draw(deckId, count) {
    setLoading(true);
    const res = await fetch(`${API}/${deckId}/draw/?count=${count}`);
    const data = await res.json();
    setLoading(false);
    return data.cards;
  }

  function enviarPontuacao(pontos) {
    if (pontos !== 0) {
      console.log(`Enviando ${pontos} pontos para a API...`);
      api.postScore(pontos)
        .then(() => {
          console.log('API respondeu: Pontuação enviada com SUCESSO!');
        })
        .catch(err => {
          console.error('API respondeu: FALHA ao enviar pontuação:', err.message);
        });
    } else {
      console.log("Fim de jogo. Nenhum ponto a enviar.");
    }
  }

  async function hit() {
    if (gameOver || turn !== "player" || playerStopped) return;
    const card = await draw(deckId, 1);
    const newHand = [...playerCards, ...card];
    setPlayerCards(newHand);

    const playerScore = score(newHand);
    if (playerScore > 21) {
      endGame(newHand, dealerCards);
    }
  }

  async function stand() {
    if (gameOver || turn !== "player" || playerStopped) return;

    setPlayerStopped(true);
    setTurn("dealer");

    await dealerTurn();
  }

  async function dealerTurn() {
    if (gameOver) return;

    setDealerPlaying(true);


    const levelMap = { easy: 17, medium: 18, hard: 19 };
    const dealerLimit = levelMap[iaLevel] || 17;

    let currentHand = [...dealerCards];
    let currentScore = score(currentHand);

    while (currentScore < dealerLimit && currentScore <= 21) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newCard = await draw(deckId, 1);
      currentHand = [...currentHand, ...newCard];
      setDealerCards(currentHand);

      currentScore = score(currentHand);
    }

    setDealerPlaying(false);
    endGame(playerCards, currentHand);
  }

  function endGame(finalPlayerCards, finalDealerCards) {
    if (gameOver) return;

    const playerScore = score(finalPlayerCards);
    const dealerScore = score(finalDealerCards);
    let msg = "";

    let pontuacaoFinalParaEnviar = 0;
    const PONTOS_VITORIA = 100;
    const PONTOS_EMPATE = 10;
    const PONTOS_DERROTA = -50;

    if (playerScore > 21) {
      msg = "Você estourou! Dealer venceu!";
      pontuacaoFinalParaEnviar = PONTOS_DERROTA;
    } else if (dealerScore > 21) {
      msg = "Dealer estourou! Você venceu!";
      pontuacaoFinalParaEnviar = PONTOS_VITORIA;
    } else if (playerScore > dealerScore) {
      msg = "Você venceu!";
      pontuacaoFinalParaEnviar = PONTOS_VITORIA;
    } else if (playerScore < dealerScore) {
      msg = "Dealer venceu!";
      pontuacaoFinalParaEnviar = PONTOS_DERROTA;
    } else {
      msg = "Empate!";
      pontuacaoFinalParaEnviar = PONTOS_EMPATE;
    }

    setMessage(msg);
    setGameOver(true);
    setRevealDealer(true);
    setTurn("");
    setPlayerStopped(true);

    console.log(`FIM DE JOGO: ${msg} | Player: ${playerScore} | Dealer: ${dealerScore}`);
    enviarPontuacao(pontuacaoFinalParaEnviar);

    if (pontuacaoFinalParaEnviar > 0) {
      setModalPoints(pontuacaoFinalParaEnviar);
    } else if (pontuacaoFinalParaEnviar < 0) setModalNegativePoints(pontuacaoFinalParaEnviar)
  }

  function PointsModal({ points, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-xl w-full max-w-sm text-center">
          <FaTrophy className="text-yellow-400 text-6xl mx-auto mb-4" />

          <h2 className="text-3xl font-bold mb-2">Parabéns!</h2>

          <p className="text-xl text-gray-300 mb-6">
            {points === 10 ? "Você empatou e ganhou" : "Você venceu e ganhou"}
          </p>

          <div className="text-5xl font-bold text-green-400 mb-8">
            +{points} pontos
          </div>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-xl bg-green-600 text-white font-bold shadow-lg transition hover:bg-green-700"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  function PointsModalNegativo({ points, onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-xl w-full max-w-sm text-center">
          <FaFrown className="text-red-400 text-6xl mx-auto mb-4" />

          <h2 className="text-3xl font-bold mb-2">Que pena!</h2>

          <p className="text-xl text-gray-300 mb-6">
            Você perdeu esta rodada.
          </p>

          <div className="text-5xl font-bold text-red-400 mb-8">
            {points} pontos
          </div>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-xl bg-red-600 text-white font-bold shadow-lg transition hover:bg-red-700"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  function ScoreBoard({ title, cards, score, hidden }) {
    return (
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white mb-2">
          {title} {typeof score === "number" && !hidden ? `(${score})` : ""}
        </h2>
        <div className="flex gap-2 justify-center">
          {cards.map((card, idx) => (
            <img
              key={card.code + idx}

              src={
                hidden
                  ? "https://deckofcardsapi.com/static/img/back.png"
                  : card.image
              }
              alt={hidden ? "Carta Virada" : card.value}
              className="w-16 h-24 rounded shadow"
            />
          ))}
        </div>
      </div>
    );
  }

  function Controls({ hit, stand, disabled }) {
    return (
      <div className="flex gap-4 justify-center">
        <button
          onClick={hit}
          disabled={disabled}
          className={`px-6 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg transition
            ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
        >
          Pegar carta
        </button>
        <button
          onClick={stand}
          disabled={disabled}
          className={`px-6 py-3 rounded-xl bg-purple-600 text-white font-bold shadow-lg transition
            ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"}`}
        >
          Parar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-48 pb-40 flex items-center justify-center bg-gradient-to-b from-blue-950 via-indigo-950 to-purple-950">

      {modalPoints && (
        <PointsModal
          points={modalPoints}
          onClose={() => setModalPoints(null)}
        />
      )}

      {modalNegativePoints && (
        <PointsModalNegativo
          points={modalNegativePoints}
          onClose={() => setModalNegativePoints(null)}
        />
      )}

      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold text-white mb-6 drop-shadow-lg text-center">Jogar vinte-e-um</h1>
        {loading && (
          <div className="flex flex-col items-center justify-center my-8">
            <GiCardAceSpades className="animate-spin text-white text-6xl mb-2" />
            <span className="text-white font-semibold">Carregando cartas...</span>
          </div>
        )}
        {!started ? (
          <div className="bg-white/10 rounded-2xl shadow-lg p-6 mb-8 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">Selecione o nível da IA</h2>
            <div className="flex flex-col gap-4 w-full">
              {IA_LEVELS.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setIaLevel(level.value)}
                  className={`w-full px-4 py-3 rounded-xl font-bold text-lg transition
                    ${iaLevel === level.value
                      ? "bg-blue-700 text-white shadow-lg"
                      : "bg-white/20 text-blue-200 hover:bg-blue-800 hover:text-white"}`}
                >
                  {level.label}
                </button>
              ))}
            </div>
            <button
              onClick={startGame}
              disabled={!iaLevel || loading}
              className={`mt-6 px-6 py-3 rounded-xl bg-green-600 text-white font-bold shadow-lg transition
                ${!iaLevel || loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"}`}
            >
              Iniciar Jogo
            </button>
          </div>
        ) : (
          !loading && (
            <div className="bg-white/10 rounded-2xl shadow-lg p-6 flex flex-col gap-8 items-center">
              <div className="mb-2 text-center">
                <span className="text-white text-lg font-bold">
                  Turno: {turn === "player" ? "Você" : (turn === "dealer" ? "Dealer" : "Fim de Jogo")}
                </span>
              </div>
              <ScoreBoard
                title="Dealer"
                cards={dealerCards}
                score={score(dealerCards)}
                hidden={!revealDealer}
                hideAll={false}
              />
              <ScoreBoard
                title="Suas cartas"
                cards={playerCards}
                score={score(playerCards)}
                hidden={false}
              />
              {message && (
                <div className="text-xl text-white font-bold text-center mt-4 drop-shadow-lg">
                  {message}
                </div>
              )}
              <div className="flex justify-center mt-6">
                <Controls
                  hit={hit}
                  stand={stand}
                  disabled={
                    gameOver ||
                    turn !== "player" ||
                    loading ||
                    playerStopped ||
                    dealerPlaying
                  }
                />
              </div>

              {gameOver && (
                <button
                  onClick={resetGame}
                  className="mt-4 px-6 py-3 rounded-xl bg-orange-600 text-white font-bold shadow-lg transition hover:bg-orange-700"
                >
                  Jogar Novamente
                </button>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}