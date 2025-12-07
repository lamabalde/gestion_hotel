// src/components/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // <--- Nouveaux imports
import '../styles/App.css';

interface NavItem {
    name: string;
    path: string;
}

const Sidebar: React.FC = () => {
  // Récupère l'objet location de React Router
  const location = useLocation();

  const navItems: NavItem[] = [
    { name: 'Principal', path: '/principal' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Liste des hôtels', path: '/hotels' },
  ];
  
  // Fonction de vérification de l'état actif
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        **RED PRODUCT**
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li
              key={item.name}
              // Applique la classe 'active' si le chemin de l'item correspond au chemin actuel
              className={isActive(item.path) ? 'nav-item active' : 'nav-item'}
            >
              {/* Utilisation de Link pour naviguer sans rechargement de page */}
              <Link to={item.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">

[Image of user avatar]
</div>
          <p>**Mouhamet Badiane**</p>
          <p className="status">en ligne</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;