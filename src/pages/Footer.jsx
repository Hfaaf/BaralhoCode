export default function Footer() {
    return (
        <>
            <footer>
                <div className="bg-gray-900 rounded-t-4xl w-fit mx-auto fixed bottom-0 left-0 right-0 z-50">
                    <div className="flex items-center p-3">
                        <div className="flex items-center space-x-8 rtl:space-x-reverse">
                            <p className="text-white">Feito por Heitor Farias Para atividade "Meu primeiro web app Conectado".</p>
                        </div>
                        <div className="flex items-center space-x-8 px-4">
                            <a href="https://deckofcardsapi.com/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 rtl:space-x-reverse">
                                <span className="text-white">API USADA</span>
                                { }
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}