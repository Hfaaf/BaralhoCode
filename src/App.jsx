import { useBlackjack } from "./hooks/useBlackjack";
import ScoreBoard from "./components/scoreBoard";
import Controls from "./components/controls";

export default function App() {
  const {
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
  } = useBlackjack();

  return (
    <div className="flex flex-col items-center p-6 bg-green-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">♠️ Blackjack</h1>

      <Controls
        start={startGame}
        hit={hit}
        stand={stand}
        disabled={!deckId || gameOver || turn !== "player"}
      />

      <ScoreBoard
        title="Dealer"
        cards={dealerCards}
        score={calcScore(dealerCards)}
        hidden={!revealDealer}
      />

      <ScoreBoard
        title="Você"
        cards={playerCards}
        score={calcScore(playerCards)}
      />

      {turn === "dealer" && !gameOver && (
        <p className="mt-6 text-lg italic">Dealer está jogando...</p>
      )}

      {message && <p className="mt-6 text-2xl font-bold">{message}</p>}
    </div>
  );
}
