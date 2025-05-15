import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/PlatilloDetalle.css';

export default function PlatilloDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [platillo, setPlatillo] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => setPlatillo(data.meals?.[0]));
  }, [id]);

  if (!platillo) return <p className="cargando">Cargando platillo...</p>;

  const ingredientes = [];
  for (let i = 1; i <= 20; i++) {
    const ing = platillo[`strIngredient${i}`];
    const cant = platillo[`strMeasure${i}`];
    if (ing && ing.trim() !== '') {
      ingredientes.push({ nombre: ing, cantidad: cant });
    }
  }

  return (
    <div className="detalle-container">
      <button className="btn-volver" onClick={() => navigate(-1)}>← Volver</button>

      <div className="detalle-header">
        <div className="detalle-img">
          <img src={platillo.strMealThumb} alt={platillo.strMeal} />
        </div>
        <div className="detalle-info">
          <h2>{platillo.strMeal}</h2>
          <p><strong>Categoría:</strong> {platillo.strCategory}</p>
          <p><strong>Origen:</strong> {platillo.strArea}</p>
          {platillo.strTags && (
            <p><strong>Tags:</strong> {platillo.strTags.replaceAll(',', ', ')}</p>
          )}
        </div>
      </div>

      <div className="detalle-body">
        <h3>🧾 Ingredientes</h3>
        <div className="ingredientes-grid">
          {ingredientes.map((item, idx) => (
            <div key={idx} className="ingrediente">
              <span>{item.cantidad}</span>
              <span>{item.nombre}</span>
            </div>
          ))}
        </div>

        <h3>📋 Instrucciones</h3>
        <p className="instrucciones">{platillo.strInstructions}</p>

        {platillo.strYoutube && (
          <div className="detalle-video">
            <h3>🎥 Video</h3>
            <iframe
              title="video-receta"
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${platillo.strYoutube.split('v=')[1]}`}
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}
