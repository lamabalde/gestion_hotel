// src/components/Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // <--- Nouvel import
import '../styles/App.css'; 

const Header: React.FC = () => {
  const navigate = useNavigate();

  // Logique de déconnexion
  const handleLogout = () => {
    // 1. Logique de déconnexion réelle (suppression du token, etc.)
    console.log("Déconnexion de l'utilisateur..."); 
    // Par exemple : localStorage.removeItem('authToken');
    
    // 2. Redirection vers la page de connexion
    navigate('/login'); 
  };

  return (
    <header className="header">
      <div className="dashboard-title">Dashboard</div>
      <div className="header-actions">
        <div className="search-bar">
          <span role="img" aria-label="search">🔍</span>
          <input type="text" placeholder="Recherche" />
        </div>
        
        {/* Bouton de Déconnexion */}
        <button onClick={handleLogout} className="logout-button">
            Déconnexion
        </button>

        <div className="user-icon">
          <span role="img" aria-label="user">👤</span>
        </div>
      </div>
    </header>
  );
};

export default Header;