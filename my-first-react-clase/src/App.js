import { Link } from 'react-router-dom';
import MyRouters from './router/Router';

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/about">Acerca de</Link></li>
            <li><Link to="/contact">Contacto</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>
      <MyRouters />
    </div>
  );
}

export default App;
