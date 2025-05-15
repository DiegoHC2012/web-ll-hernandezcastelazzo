import React from 'react';
import { useEffect, useState } from 'react';
import Category from './Category';

export default function ListaCategorias() {
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
        })
        .catch(err => console.error('Error al cargar categorías:', err));
    }
  }, []);

  return (
    <div className="Category-list">
      {categorias.map(cat => (
        <Category
          key={cat.idCategory}
          nombre={cat.strCategory}
          urlImagen={cat.strCategoryThumb}
        />
      ))}
    </div>
  );
}
