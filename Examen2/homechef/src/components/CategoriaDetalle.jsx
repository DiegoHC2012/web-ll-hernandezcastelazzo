import React, { useEffect, useState } from 'react';
import Category from './Category';
import PlatilloCard from './PlatilloCard';

export default function ListaCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [comidas, setComidas] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    const dataLocal = localStorage.getItem('categorias');
    if (dataLocal) {
      setCategorias(JSON.parse(dataLocal));
    } else {
      fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => {
          setCategorias(data.categories);
          localStorage.setItem('categorias', JSON.stringify(data.categories));
        });
    }
  }, []);

  const cargarComidas = (nombreCategoria) => {
    setCategoriaSeleccionada(nombreCategoria);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${nombreCategoria}`)
      .then(res => res.json())
      .then(data => setComidas(data.meals || []));
  };

  return (
    <div className="Lista-completa">
      <div className="Category-list">
        {categorias.map(cat => (
          <div key={cat.idCategory} onClick={() => cargarComidas(cat.strCategory)}>
            <Category
              nombre={cat.strCategory}
              urlImagen={cat.strCategoryThumb}
            />
          </div>
        ))}
      </div>

      {categoriaSeleccionada && (
        <div className="Platillo-list">
          <h2>Recetas de {categoriaSeleccionada}</h2>
          <div className="Platillo-grid">
            {comidas.map(plato => (
              <PlatilloCard
                key={plato.idMeal}
                nombre={plato.strMeal}
                imagen={plato.strMealThumb}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
