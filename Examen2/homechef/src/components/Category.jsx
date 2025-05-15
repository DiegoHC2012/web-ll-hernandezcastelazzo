import React from 'react';
import '../styles/Category.css';

export default function Category({ nombre, urlImagen, esSeleccionada }) {
  return (
    <div className={`Category-container ${esSeleccionada ? 'seleccionada' : ''}`}>
      <div className="Category-img-wrapper">
        <img className="Category-img" src={urlImagen} alt={nombre} />
      </div>
      <p className="Category-name">{nombre}</p>
    </div>
  );
}
