import React from 'react';
import '../styles/Category.css';
import { Link } from 'react-router-dom';

export default function Category({ nombre, urlImagen }) {
  return (
    <Link to={`/categoria/${nombre}`} className="Category-container">
      <div className="Category-img-wrapper">
        <img className="Category-img" src={urlImagen} alt={nombre} />
      </div>
      <p className="Category-name">{nombre}</p>
    </Link>
  );
}
