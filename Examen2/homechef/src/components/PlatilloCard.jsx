import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PlatilloCard.css';

export default function PlatilloCard({ nombre, imagen, id }) {
  const navigate = useNavigate();

  const irADetalle = () => {
    navigate(`/platillo/${id}`);
  };

  return (
    <div className="Platillo-card" onClick={irADetalle} style={{ cursor: 'pointer' }}>
      <img className="Platillo-img" src={imagen} alt={nombre} />
      <p className="Platillo-nombre">{nombre}</p>
    </div>
  );
}
