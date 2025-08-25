export default function Controls({ start, hit, stand, disabled }) {
  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={start}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Iniciar Jogo
      </button>
      <button
        onClick={hit}
        disabled={disabled}
        className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700 disabled:opacity-50"
      >
        Pegar Carta
      </button>
      <button
        onClick={stand}
        disabled={disabled}
        className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 disabled:opacity-50"
      >
        Parar
      </button>
    </div>
  );
}
