import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import * as api from '../apiService'
import ProfilePictureUploader from './ProfilePictureUploader'

function Auth() {
    const [isLoginView, setIsLoginView] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [profilePicture, setProfilePicture] = useState(null)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setMessage('')

        try {
            if (isLoginView) {
                const data = await api.loginUser(username, password)
                login(data.token)
            } else {
                const data = await api.registerUser(username, password, profilePicture)
                setMessage(data.message)
                setIsLoginView(true)
            }
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-6 text-green-400">
                    {isLoginView ? 'Login' : 'Registro'} - Vinte e Um
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    {!isLoginView && (
                        <ProfilePictureUploader onCapture={setProfilePicture} />
                    )}

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    {message && <p className="text-green-400 text-sm text-center">{message}</p>}

                    <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors">
                        {isLoginView ? 'Entrar' : 'Registrar'}
                    </button>
                </form>

                <p className="text-center mt-6">
                    {isLoginView ? 'Não tem conta?' : 'Já tem conta?'}
                    <button
                        onClick={() => {
                            setIsLoginView(!isLoginView)
                            setError('')
                            setMessage('')
                        }}
                        className="text-green-400 hover:underline ml-2 font-semibold"
                    >
                        {isLoginView ? 'Registre-se' : 'Faça Login'}
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Auth