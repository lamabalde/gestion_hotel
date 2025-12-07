import React from 'react';

// Définition de l'interface des props pour StatCard
interface StatCardProps {
  icon: React.ReactNode; // Peut être un string ou un élément JSX
  color: string;
  title: string;
  value: number;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, color, title, value, description }) => {
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const iconContainerStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '20px',
    marginBottom: '10px',
  };

  return (
    <div style={cardStyle}>
      <div style={iconContainerStyle}>{icon}</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</div>
      <div style={{ fontSize: '14px', color: '#333' }}>{title}</div>
      <p style={{ fontSize: '12px', color: '#777', margin: '0' }}>{description}</p>
    </div>
  );
};

export default StatCard;