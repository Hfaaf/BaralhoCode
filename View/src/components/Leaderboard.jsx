import React, { useState, useEffect } from 'react'
import * as api from '../apiService'
import { CgClose } from 'react-icons/cg'

function Leaderboard({ onClose }) {
    const [scores, setScores] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchScores = async () => {
            try {
                setLoading(true)
                const data = await api.getLeaderboard()
                setScores(data)
                setError(null)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchScores()
    }, [])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
                >
                    <CgClose />
                </button>

                <h2 className="text-3xl font-bold text-center mb-6 text-green-400">
                    Placar de Líderes
                </h2>

                {loading && <p className="text-center">Carregando placar...</p>}
                {error && <p className="text-center text-red-400">{error}</p>}

                {!loading && !error && (
                    <ol className="list-decimal list-inside space-y-3">
                        {scores.length > 0 ? scores.map((entry, index) => (
                            <li key={entry._id} className="text-lg flex items-center gap-3 p-2 bg-gray-700 rounded">
                                <span className="font-bold text-green-400 w-6">{index + 1}.</span>
                                <img
                                    src={entry.user.profilePicture || '/public/pngegg.png'} // Imagem padrão
                                    alt={entry.user.username}
                                    className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
                                />
                                <span className="flex-1 font-semibold">{entry.user.username}</span>
                                <span className="font-bold">{entry.score} pontos</span>
                            </li>
                        )) : (
                            <p className="text-center text-gray-400">Nenhuma pontuação registrada ainda.</p>
                        )}
                    </ol>
                )}
            </div>
        </div>
    )
}

export default Leaderboard