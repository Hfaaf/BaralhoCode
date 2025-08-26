import { GiCard10Spades } from "react-icons/gi";

export default function Nav() {
    return (
        <>
            <nav className="bg-gray-900 rounded-b-4xl w-fit mx-auto fixed top-0 left-0 right-0 z-50">
                <div className="flex items-center p-3">
                    <div className="flex items-center space-x-8 rtl:space-x-reverse">
                        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <GiCard10Spades
                                className="h-16 w-16 text-blue-600 hover:animate-spin duration-1000 transition-all ease-in-out"
                                aria-hidden="true"
                            />
                        </a>
                        <ul className="font-medium flex space-x-8 mr-5">
                            <li>
                                <a href="#" className="block py-1 px-2 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Jogar</a>
                            </li>
                            <li>
                                <a href="#" className="block py-1 px-2 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Como jogar ?</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}