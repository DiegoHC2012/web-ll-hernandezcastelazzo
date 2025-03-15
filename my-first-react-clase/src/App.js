import logo from './logo.svg';
import './App.css';
import MyFirstComponent from './components/MyFirstComponent';
import Form from './components/Form/Form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MyFirstComponent/>
        <Form/>
      </header>
    </div>
  );
}

export default App;
