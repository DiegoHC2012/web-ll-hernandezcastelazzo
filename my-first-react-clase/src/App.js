import { Link } from 'react-router-dom';
import MyRouters from './router/Router';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li className='nav-item'><Link to="/">Inicio</Link></li>
            <li className='nav-item'><Link to="/about">Acerca de</Link></li>
            <li className='nav-item'><Link to="/contact">Contacto</Link></li>
            <li className='nav-item'><Link to="/login">Login</Link></li>
            <li className='nav-item'><Link to="/products">Productos</Link></li>
          </ul>
        </nav>
      </header>
      <MyRouters />
    </div>
  );
}

export default App;
