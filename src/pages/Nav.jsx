import { GiCard10Spades } from "react-icons/gi";

export default function Nav() {
    return (
        <nav className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 shadow-xl rounded-b-3xl w-full mx-auto fixed top-0 left-0 right-0 z-50 border-b border-blue-700">
            <div className="flex flex-col md:flex-row items-center justify-between p-4 max-w-4xl mx-auto">
                <a href="#" className="flex items-center space-x-3 mb-2 md:mb-0">
                    <GiCard10Spades
                        className="h-12 w-12 md:h-14 md:w-14 text-blue-400 hover:animate-spin transition-transform duration-700 ease-in-out drop-shadow-lg"
                        aria-hidden="true"
                    />
                    <span className="text-white text-xl md:text-2xl font-bold tracking-wide drop-shadow">Vinte-e-um</span>
                </a>
                <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 w-full md:w-auto items-center">
                    <li>
                        <a
                            href="#"
                            className="py-2 px-4 text-white bg-blue-700 rounded-full shadow hover:bg-blue-600 transition font-semibold w-full md:w-auto text-center"
                            aria-current="page"
                        >
                            Jogar
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="py-2 px-4 text-blue-300 hover:text-white rounded-full hover:bg-purple-700 transition font-semibold w-full md:w-auto text-center"
                        >
                            Como jogar?
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}