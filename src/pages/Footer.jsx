import { TbCards } from "react-icons/tb";

export default function Footer() {
    return (
        <footer>
            <div className="bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800 shadow-lg rounded-t-3xl w-full fixed bottom-0 left-0 right-0 z-50">
                <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 max-w-4xl mx-auto w-full">
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                        <span className="text-white font-semibold text-sm sm:text-base text-center sm:text-left">
                            Feito por <span className="text-blue-300">Heitor Farias</span>
                        </span>
                        <span className="hidden sm:inline-block text-gray-300">|</span>
                        <span className="text-gray-300 text-xs sm:text-sm italic text-center sm:text-left">
                            Meu primeiro web app conectado
                        </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 sm:mt-0 w-full sm:w-auto justify-center sm:justify-end">
                        <a
                            href="https://deckofcardsapi.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full shadow transition text-xs sm:text-base"
                        >
                            <TbCards />
                            <span className="ml-1">API USADA</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}