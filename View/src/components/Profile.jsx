import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import * as api from '../apiService';
import ProfilePictureUploader from './ProfilePictureUploader'; // <-- Reutilizamos seu uploader

export default function Profile() {
    const { user, updateUser, logout } = useAuth(); // Pegamos o usuário e as funções do contexto

    // Estados para os formulários
    const [username, setUsername] = useState(user.username);
    const [profilePicture, setProfilePicture] = useState(user.profilePicture);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // Estados de feedback
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const updatedUser = await api.updateUserData({ username, profilePicture });
            updateUser(updatedUser);
            setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: 'A nova senha deve ter pelo menos 6 caracteres.' });
            return;
        }
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await api.updatePassword(oldPassword, newPassword);
            setMessage({ type: 'success', text: 'Senha atualizada com sucesso!' });
            setOldPassword('');
            setNewPassword('');
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {

        if (!window.confirm(
            'TEM CERTEZA?\n\nEsta ação é irreversível. Todos os seus dados, incluindo sua pontuação, serão permanentemente deletados.'
        )) {
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await api.deleteUser();
            alert('Conta deletada com sucesso.');
            logout();
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handlePictureCapture = (dataUrl) => {
        setProfilePicture(dataUrl);
    };

    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold text-green-400 mb-6">Editar Perfil</h2>

                <div className="mb-4">
                    <img
                        src={profilePicture || '/public/pngegg.png'}
                        alt="Prévia"
                        className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-700"
                    />
                </div>

                <ProfilePictureUploader onCapture={handlePictureCapture} />

                <form onSubmit={handleProfileUpdate} className="space-y-4 mt-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                            Nome de Usuário
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </form>
            </div>

            <div className="space-y-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold text-blue-400 mb-6">Mudar Senha</h2>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Senha Antiga</label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Nova Senha</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Atualizando...' : 'Atualizar Senha'}
                        </button>
                    </form>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-xl border-2 border-red-500/50">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">Zona de Perigo</h2>
                    <p className="text-gray-300 mb-6">
                        Deletar sua conta é uma ação permanente e não pode ser desfeita.
                    </p>
                    <button
                        onClick={handleDeleteAccount}
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Deletando...' : 'Deletar Minha Conta'}
                    </button>
                </div>
            </div>

            {message.text && (
                <div
                    className={`col-span-1 md:col-span-2 p-4 rounded text-center font-semibold ${message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        }`}
                >
                    {message.text}
                </div>
            )}
        </div>
    );
}