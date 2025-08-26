export default function ComoJogar() {
  return (
    <div className="min-h-screen pt-48 pb-40 flex items-center justify-center bg-gradient-to-b from-blue-950 via-indigo-950 to-purple-950">
      <div className="max-w-lg w-full bg-white/10 rounded-2xl shadow-lg p-4 sm:p-8 mx-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">Como Jogar Vinte-e-Um</h1>
        <div className="text-white text-base sm:text-lg leading-relaxed space-y-3 sm:space-y-4">
          <p>
            <b>Vinte-e-Um</b> (Blackjack) é um jogo de cartas onde o objetivo é somar cartas para chegar o mais próximo possível de 21 pontos, sem ultrapassar esse valor.
          </p>
          <ul className="list-disc pl-5 sm:pl-6 space-y-2">
            <li>
              <b>Valores das cartas:</b> Cartas de número valem seu próprio número. Figuras (J, Q, K) valem 10 pontos. O Ás pode valer 1 ou 11 pontos, dependendo do que for melhor para sua mão.
            </li>
            <li>
              <b>Início do jogo:</b> Você e o dealer (IA) recebem duas cartas cada. Uma das cartas do dealer fica virada para baixo (oculta).
            </li>
            <li>
              <b>Seu turno:</b> Você pode escolher entre:
              <ul className="list-disc pl-5 sm:pl-6 mt-2">
                <li><b>Pegar carta:</b> Recebe uma nova carta para tentar se aproximar de 21.</li>
                <li><b>Parar:</b> Encerra sua rodada com a pontuação atual.</li>
              </ul>
            </li>
            <li>
              <b>Estouro:</b> Se sua pontuação ultrapassar 21, você perde automaticamente.
            </li>
            <li>
              <b>Turno do dealer:</b> Após você parar, o dealer revela sua carta oculta e joga tentando chegar o mais próximo de 21, seguindo regras pré-definidas de acordo com o nível de dificuldade escolhido.
            </li>
            <li>
              <b>Comparação final:</b> Quem tiver a maior pontuação sem passar de 21 vence. Se ambos tiverem a mesma pontuação, é empate.
            </li>
            <li>
              <b>Dicas:</b>
              <ul className="list-disc pl-5 sm:pl-6 mt-2">
                <li>Se tiver Ás, lembre-se que ele pode valer 1 ou 11, então é uma carta estratégica.</li>
                <li>Se estiver com 17 ou mais, pense bem antes de pegar mais cartas.</li>
                <li>Observe o comportamento do dealer: ele sempre tenta chegar perto de 21, mas pode parar antes dependendo do nível.</li>
                <li>Jogue com calma em telas pequenas: todos os controles e cartas se adaptam ao seu dispositivo!</li>
              </ul>
            </li>
            <li>
              <b>Controles do jogo:</b>
              <ul className="list-disc pl-5 sm:pl-6 mt-2">
                <li><b>Pegar carta:</b> Clique para receber uma nova carta.</li>
                <li><b>Parar:</b> Clique para encerrar sua rodada e passar o turno para o dealer.</li>
                <li>O resultado será mostrado ao final da rodada.</li>
              </ul>
            </li>
          </ul>
          <p>
            <b>Objetivo:</b> Use estratégia para vencer o dealer e chegar o mais próximo possível de 21 pontos. Boa sorte e divirta-se!
          </p>
        </div>
      </div>
    </div>
  )
}