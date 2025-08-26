import { GiCard10Spades } from "react-icons/gi";

export default function Nav({ setPage, page }) {
    return (
        <nav className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 shadow-xl rounded-b-3xl w-full fixed top-0 left-0 right-0 z-50 border-b border-blue-700">
            <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 max-w-4xl mx-auto w-full">
                <a
                    href="https://github.com/Hfaaf/BaralhoCode"
                    className="flex items-center space-x-2 mb-2 sm:mb-0"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <GiCard10Spades className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400 hover:animate-spin transition-transform duration-700 drop-shadow-lg" />
                    <span className="text-white text-lg sm:text-2xl font-bold tracking-wide drop-shadow">Vinte-e-um</span>
                </a>
                <ul className="flex flex-row space-x-4 w-full sm:w-auto justify-center sm:justify-end">
                    <li>
                        <button
                            onClick={() => setPage("jogar")}
                            className={`py-2 px-5 rounded-full font-semibold text-center transition
                                ${page === "jogar"
                                    ? "bg-blue-700 text-white"
                                    : "bg-transparent text-blue-200 hover:bg-blue-700 hover:text-white"}`}
                            aria-current={page === "jogar" ? "page" : undefined}
                        >
                            Jogar
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setPage("como-jogar")}
                            className={`py-2 px-5 rounded-full font-semibold text-center transition
                                ${page === "como-jogar"
                                    ? "bg-purple-700 text-white"
                                    : "text-blue-300 hover:text-white hover:bg-purple-700"}`}
                        >
                            Como jogar?
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}