import { useState } from "react";

export function useBlackjack() {
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [turn, setTurn] = useState("player"); // controla vez
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [revealDealer, setRevealDealer] = useState(false);

  // cria baralho
  async function startGame() {
    const deck = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    ).then((r) => r.json());

    setDeckId(deck.deck_id);
    setPlayerCards([]);
    setDealerCards([]);
    setMessage("");
    setGameOver(false);
    setRevealDealer(false);
    setTurn("player");

    // distribui cartas iniciais
    const p = await draw(deck.deck_id, 2);
    const d = await draw(deck.deck_id, 2);
    setPlayerCards(p);
    setDealerCards(d);
  }

  // puxar cartas da API
  async function draw(deckId, count) {
    const data = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`
    ).then((r) => r.json());
    return data.cards;
  }

  // calcula score
  function calcScore(cards) {
    let score = 0;
    let aces = 0;

    cards.forEach((c) => {
      if (["KING", "QUEEN", "JACK"].includes(c.value)) {
        score += 10;
      } else if (c.value === "ACE") {
        aces += 1;
        score += 11;
      } else {
        score += parseInt(c.value);
      }
    });

    while (score > 21 && aces > 0) {
      score -= 10;
      aces -= 1;
    }

    return score;
  }

  // turno do jogador: hit
  async function hit() {
    if (turn !== "player" || gameOver) return;

    const card = await draw(deckId, 1);
    const newHand = [...playerCards, ...card];
    setPlayerCards(newHand);

    if (calcScore(newHand) > 21) {
      setMessage("Você estourou! Dealer venceu 😢");
      setGameOver(true);
      setRevealDealer(true);
    } else {
      // passa a vez para o dealer
      setTurn("dealer");
      dealerTurn();
    }
  }

  // turno do jogador: stand
  function stand() {
    if (turn !== "player" || gameOver) return;
    setTurn("dealer");
    setRevealDealer(true);
    dealerTurn(true); // agora dealer joga até o fim
  }

  // turno do dealer
  async function dealerTurn(final = false) {
    setTimeout(async () => {
      const score = calcScore(dealerCards);
      const playerScore = calcScore(playerCards);

      // lógica da IA:
      // se final == false → dealer só responde com UMA carta
      // se final == true → dealer joga até 17+
      if (final) {
        if (score < 17) {
          const card = await draw(deckId, 1);
          const newHand = [...dealerCards, ...card];
          setDealerCards(newHand);
          dealerTurn(true);
          return;
        }
      } else {
        if (score < playerScore && score < 21) {
          const card = await draw(deckId, 1);
          const newHand = [...dealerCards, ...card];
          setDealerCards(newHand);
        }
      }

      // verifica fim
      if (final) {
        endGame();
      } else {
        setTurn("player");
      }
    }, 1000); // 1s para parecer mais "turno"
  }

  // fim de jogo
  function endGame() {
    const dealerScore = calcScore(dealerCards);
    const playerScore = calcScore(playerCards);

    setRevealDealer(true);
    setGameOver(true);

    if (dealerScore > 21 || playerScore > dealerScore) {
      setMessage("Você venceu! 🎉");
    } else if (dealerScore === playerScore) {
      setMessage("Empate! 🤝");
    } else {
      setMessage("Dealer venceu! 😈");
    }
  }

  return {
    deckId,
    playerCards,
    dealerCards,
    gameOver,
    message,
    startGame,
    hit,
    stand,
    calcScore,
    revealDealer,
    turn,
  };
}
