export default function ScoreBoard({ title, cards, score, hidden }) {
  return (
    <div className="mb-6 text-center">
      <h2 className="text-xl mb-2">
        {title} {hidden ? "" : `(${score})`}
      </h2>
      <div className="flex justify-center gap-2">
        {cards.map((c, idx) =>
          hidden ? (
            <img
              key={c.code + idx}
              src="https://deckofcardsapi.com/static/img/back.png"
              alt="hidden card"
              className="w-20"
            />
          ) : (
            <img key={c.code} src={c.image} alt={c.value} className="w-20" />
          )
        )}
      </div>
    </div>
  );
}
