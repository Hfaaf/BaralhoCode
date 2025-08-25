export default function CardList({ cards }) {
  return (
    <div className="flex justify-center gap-2">
      {cards.map((c) => (
        <img key={c.code} src={c.image} alt={c.value} className="w-20" />
      ))}
    </div>
  );
}
