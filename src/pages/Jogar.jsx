import { useState } from "react";
import { GiCardAceSpades } from "react-icons/gi";

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
  const [dealerStopped, setDealerStopped] = useState(false);

  async function startGame() {
    setLoading(true);
    setStarted(true);
    setGameOver(false);
    setMessage("");
    setRevealDealer(false);
    setTurn("player");
    setPlayerStopped(false);
    setDealerStopped(false);
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

  async function hit() {
    if (gameOver || turn !== "player" || playerStopped) return;
    const card = await draw(deckId, 1);
    const newHand = [...playerCards, ...card];
    setPlayerCards(newHand);
    const playerScore = score(newHand);
    if (playerScore > 21) {
      setMessage("Você perdeu!");
      setGameOver(true);
      setRevealDealer(true);
    } else {
      setTurn("dealer");
      setTimeout(() => dealerTurn(), 700);
    }
  }

  function stand() {
  if (gameOver || turn !== "player" || playerStopped) return;
  setPlayerStopped(true);
  setTurn("dealer");

  if (dealerStopped) {
    endGame(dealerCards);
  } else {
    dealerTurn();
  }
}


  async function dealerTurn() {
  if (gameOver) return;

  setDealerPlaying(true);

  const levelMap = { easy: 17, medium: 18, hard: 19 };
  const dealerLimit = levelMap[iaLevel] || 17;

  let hand = [...dealerCards];

  while (true) {
    const dScore = score(hand);

    if (dScore > 21) {
      setDealerCards(hand);
      setMessage("Dealer estourou! Você venceu!");
      setRevealDealer(true);
      setGameOver(true);
      setDealerPlaying(false);
      setDealerStopped(true);
      return;
    }

    if (dScore >= dealerLimit) {
      setDealerCards(hand);
      setDealerPlaying(false);
      setDealerStopped(true);

      if (playerStopped) {
        endGame(hand);
      } else {
          setTurn("player");
      }
      return;
    }
    const next = await draw(deckId, 1);
    hand = [...hand, ...next];
    setDealerCards(hand);

    if (!playerStopped) {
      setDealerPlaying(false);
      setTurn("player");
      return;
    }
  }
}


  function endGame(dealerHand = dealerCards) {
    const playerScore = score(playerCards);
    const dealerScore = score(dealerHand);
    let msg = "";
    if (playerScore > 21) msg = "Você perdeu!";
    else if (dealerScore > 21) msg = "Dealer estourou! Você venceu!";
    else if (playerScore > dealerScore) msg = "Você venceu!";
    else if (playerScore < dealerScore) msg = "Dealer venceu!";
    else msg = "Empate!";

    setRevealDealer(true);
    setMessage(msg);
    setGameOver(true);
  }


  function ScoreBoard({ title, cards, score, hidden, hideAll }) {
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
                hideAll
                  ? "https://deckofcardsapi.com/static/img/back.png"
                  : hidden
                    ? "https://deckofcardsapi.com/static/img/back.png"
                    : card.image
              }
              alt={card.value}
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
    <div className="min-h-screen pt-24 pb-28 flex items-center justify-center bg-gradient-to-b from-blue-950 via-indigo-950 to-purple-950">
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
                  Turno: {turn === "player" ? "Você" : "Dealer"}
                </span>
              </div>
              <ScoreBoard
                title="Dealer"
                cards={dealerCards}
                score={score(dealerCards)}
                hidden={!revealDealer}
                hideAll={turn === "dealer" && dealerPlaying}
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
                    playerStopped
                  }
                />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}