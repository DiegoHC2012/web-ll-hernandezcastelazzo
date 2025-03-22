import MyFirstComponent from '../components/MyFirstComponent';
import Form from '../components/Form/Form';
import logo from '../logo.svg';
import '../App.css';
import ValidateToken from '../utils/ValidateToken';
export default function Home() {
    ValidateToken();
    return (
        <div>
            <h1>Home</h1>
            <img src={logo} className="App-logo" alt="logo" />
            <MyFirstComponent/>
            <Form/>
        </div>
    )
}