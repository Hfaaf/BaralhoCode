import { FaTrophy, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function Nav({ setPagina, onShowLeaderboard, onLogout }) {
    const { user } = useAuth()

    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">

                {user ? (
                    <span className="text-white text-sm">
                        Olá, <strong className="text-green-400">{user.username}</strong>
                    </span>
                ) : (
                    <h1 className="text-2xl font-bold text-green-400">Vinte e Um</h1>
                )}

                <div className="space-x-4 flex items-center">
                    <button onClick={() => setPagina('jogar')} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                        Jogar
                    </button>
                    <button onClick={() => setPagina('como-jogar')} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                        Como Jogar
                    </button>

                    <button
                        onClick={() => setPagina('perfil')}
                        title="Perfil"
                        className="text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
                    >
                        <FaUser size={20} />
                    </button>

                    <button onClick={onShowLeaderboard} title="Placar" className="text-gray-300 hover:text-yellow-400 transition-colors cursor-pointer">
                        <FaTrophy size={20} />
                    </button>
                    <button onClick={onLogout} title="Sair" className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer">
                        <FaSignOutAlt size={20} />
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Nav;