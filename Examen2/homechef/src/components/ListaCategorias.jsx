import React, { useEffect, useState } from 'react';
import Category from './Category';
import '../styles/ListaCategorias.css';

export default function ListaCategorias({
  setPlatillos,
  setCategoriaSeleccionada,
  categoriaSeleccionada
}) {
  const [categorias, setCategorias] = useState([]);

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
      .then(data => setPlatillos(data.meals || []));
  };

  return (
    <div className="Category-list">
      {categorias.map(cat => (
        <div
          key={cat.idCategory}
          onClick={() => cargarComidas(cat.strCategory)}
          style={{ cursor: 'pointer' }}
        >
          <Category
            nombre={cat.strCategory}
            urlImagen={cat.strCategoryThumb}
            esSeleccionada={categoriaSeleccionada === cat.strCategory}
          />
        </div>
      ))}
    </div>
  );
}
