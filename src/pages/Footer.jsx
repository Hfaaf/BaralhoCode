import {TbCards} from "react-icons/tb"

export default function Footer() {
    return (
        <footer>
            <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 shadow-lg rounded-t-3xl w-full mx-auto fixed bottom-0 left-0 right-0 z-50">
                <div className="flex flex-col md:flex-row items-center justify-between p-4 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
                        <span className="text-white font-semibold text-base md:text-lg text-center md:text-left">
                            Feito por <span className="text-blue-300">Heitor Farias</span>
                        </span>
                        <span className="hidden md:inline-block text-gray-300">|</span>
                        <span className="text-gray-300 text-xs md:text-sm italic text-center md:text-left">
                            Meu primeiro web app conectado
                        </span>
                    </div>
                    <div className="flex items-center space-x-3 mt-2 md:mt-0 w-full md:w-auto justify-center md:justify-end">
                        <a
                            href="https://deckofcardsapi.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full shadow transition text-sm md:text-base"
                        >
                            <TbCards />
                            API USADA
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}