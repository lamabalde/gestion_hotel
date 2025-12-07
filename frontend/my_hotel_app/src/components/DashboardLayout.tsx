// src/components/DashboardLayout.tsx
import React from 'react';
import Header from './Header'; // Assurez-vous d'avoir ce fichier Header.tsx
import Sidebar from './Sidebar'; // Assurez-vous d'avoir ce fichier Sidebar.tsx
import '../styles/App.css'; // Pour les styles de la mise en page (app-layout, main-content)

// Définition des props : 'children' est le contenu de la page spécifique (DashboardContent, Liste des hôtels, etc.)
interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        {/* Le contenu spécifique de la route se place ici */}
        <div className="page-content-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;