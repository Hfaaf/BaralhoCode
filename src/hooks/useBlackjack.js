import { useState } from "react";

export function useBlackjack() {
  const [deckId, setDeckId] = useState(null);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [revealDealer, setRevealDealer] = useState(false);

  const calcScore = (cards) => {
    let total = 0;
    let aces = 0;

    cards.forEach((c) => {
      if (["KING", "QUEEN", "JACK"].includes(c.value)) total += 10;
      else if (c.value === "ACE") {
        total += 11;
        aces++;
      } else {
        total += parseInt(c.value);
      }
    });

    while (total > 21 && aces > 0) {
      total -= 10;
      aces--;
    }

    return total;
  };

  const startGame = async () => {
    const res = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const data = await res.json();
    setDeckId(data.deck_id);

    const draw = await fetch(
      `https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=4`
    );
    const hand = await draw.json();

    setPlayerCards([hand.cards[0], hand.cards[2]]);
    setDealerCards([hand.cards[1], hand.cards[3]]);

    setGameOver(false);
    setMessage("");
    setRevealDealer(false);
  };

  const hit = async () => {
    if (!deckId || gameOver || revealDealer) return;

    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const data = await res.json();

    const newHand = [...playerCards, data.cards[0]];
    setPlayerCards(newHand);

    if (calcScore(newHand) > 21) {
      setGameOver(true);
      setRevealDealer(true);
      setMessage("💥 Você estourou! Dealer vence.");
    }
  };

  const stand = async () => {
    setRevealDealer(true);

    let dealerHand = [...dealerCards];
    let dealerScore = calcScore(dealerHand);

    while (dealerScore < 17) {
      const res = await fetch(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      const data = await res.json();

      dealerHand.push(data.cards[0]);
      dealerScore = calcScore(dealerHand);
    }

    setDealerCards(dealerHand);

    const playerScore = calcScore(playerCards);

    if (dealerScore > 21) setMessage("🔥 Dealer estourou! Você vence.");
    else if (dealerScore > playerScore) setMessage("🏆 Dealer vence!");
    else if (dealerScore < playerScore) setMessage("🎉 Você venceu!");
    else setMessage("🤝 Empate!");

    setGameOver(true);
  };

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
  };
}
