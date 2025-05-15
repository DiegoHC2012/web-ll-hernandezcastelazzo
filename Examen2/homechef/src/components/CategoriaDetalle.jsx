import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function CategoriaDetalle() {
  const { nombre } = useParams();
  const [comidas, setComidas] = useState([]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${nombre}`)
      .then(res => res.json())
      .then(data => setComidas(data.meals || []));
  }, [nombre]);

  return (
    <div>
      <h2>Comidas en {nombre}</h2>
      <div>
        {comidas.map(comida => (
          <div key={comida.idMeal}>
            <img src={comida.strMealThumb} alt={comida.strMeal} />
            <p>{comida.strMeal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
