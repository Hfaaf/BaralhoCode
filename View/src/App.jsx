import React, { useState } from 'react'
import { useAuth } from './context/AuthContext'
import Auth from './components/Auth'
import Nav from './components/Nav'
import Jogar from './components/Jogar'
import ComoJogar from './components/ComoJogar'
import Footer from './components/Footer'
import Leaderboard from './components/Leaderboard'
import Profile from './components/Profile';

function App() {
  const { token, logout } = useAuth();
  const [pagina, setPagina] = useState('jogar');
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  if (!token) {
    return <Auth />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Nav
        setPagina={setPagina}
        onShowLeaderboard={() => setShowLeaderboard(true)}
        onLogout={logout}
      />

      <main className="flex-grow container mx-auto p-4">
        {pagina === 'jogar' && <Jogar />}
        {pagina === 'como-jogar' && <ComoJogar />}
        {pagina === 'perfil' && <Profile />}
      </main>

      {showLeaderboard && (
        <Leaderboard onClose={() => setShowLeaderboard(false)} />
      )}

      {pagina !== 'perfil' && <Footer />}
    </div>
  );
}
export default App;