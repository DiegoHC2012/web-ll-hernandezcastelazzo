import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner';
import ListaCategorias from './components/ListaCategorias';
import CategoriaDetalle from './components/CategoriaDetalle';
import PlatilloCard from './components/PlatilloCard';
import { FaSearch } from 'react-icons/fa';
import PlatilloDetalle from './components/PlatilloDetalle';

function App() {
  const [platillos, setPlatillos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [ordenAscendente, setOrdenAscendente] = useState(true); // ✅ estado de orden

  // ✅ función para cambiar entre A-Z y Z-A
  const toggleOrden = () => {
    setOrdenAscendente(!ordenAscendente);
  };

  return (
    <Router>
      <div className="App">
        <Banner />
        <div className="App-content">
          {/* IZQUIERDA: CATEGORÍAS */}
          <div className="App-content-left">
            <p className="App-content-left-titulo">Categories</p>
            <ListaCategorias
              setPlatillos={setPlatillos}
              setCategoriaSeleccionada={setCategoriaSeleccionada}
              categoriaSeleccionada={categoriaSeleccionada}
            />
          </div>

          {/* DERECHA: Platillos o detalles */}
          <div className="App-content-right">
            <Routes>
              <Route
                path="/"
                element={
                  platillos.length > 0 ? (
                    <div>
                      <div className="Barra-busqueda-container">
                        <FaSearch className="icono-lupa" />
                        <input
                          type="text"
                          placeholder="Buscar platillo"
                          className="Barra-busqueda"
                          value={busqueda}
                          onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <button className="Boton-orden" onClick={toggleOrden}>
                          {ordenAscendente ? 'Ordenar Z-A' : 'Ordenar A-Z'}
                        </button>
                      </div>

                      <div className="Platillo-grid">
                        {[...platillos]
                          .filter(plato =>
                            plato.strMeal.toLowerCase().includes(busqueda.toLowerCase())
                          )
                          .sort((a, b) =>
                            ordenAscendente
                              ? a.strMeal.localeCompare(b.strMeal)
                              : b.strMeal.localeCompare(a.strMeal)
                          )
                          .map(plato => (
                            <PlatilloCard
                              key={plato.idMeal}
                              id={plato.idMeal}
                              nombre={plato.strMeal}
                              imagen={plato.strMealThumb}
                            />
                          ))}
                      </div>
                    </div>
                  ) : (
                    <p
                      style={{
                        textAlign: 'center',
                        marginTop: '3.5rem',
                        color: 'gray',
                      }}
                    >
                      Selecciona una categoría para ver los platillos...
                    </p>
                  )
                }
              />
              <Route path="/categoria/:nombre" element={<CategoriaDetalle />} />
              <Route path="/platillo/:id" element={<PlatilloDetalle />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
