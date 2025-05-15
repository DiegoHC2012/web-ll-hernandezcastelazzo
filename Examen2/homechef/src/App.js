import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner';
import ListaCategorias from './components/ListaCategorias';
import CategoriaDetalle from './components/CategoriaDetalle';

function App() {
  return (
    <Router>
      <div className="App">
        <Banner />
        <div className='App-content'>
          <div className='App-content-left'>
            <p className='App-content-left-titulo'>Categories</p>
            <div className='App-content-left-categorias'>
              <Routes>
                <Route path="/" element={<ListaCategorias />} />
                <Route path="/categoria/:nombre" element={<CategoriaDetalle />} />
              </Routes>
            </div>
          </div>
          <div className='App-content-right'>
            <p>Right</p>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
