import '../style/login.css'
export default function Login() {
    return (
        <div>
            <div className="containerLogin">
                <h3>Login</h3>
                <form className="formLogin">
                    <input className="login-input" type="text" placeholder="User" name="user" />
                    <input className="login-input" type="password" placeholder="Password" name="password" />
                    <div className="login-button-container">
                        <button className="login-button">Login</button>
                    </div>
                </form>
            </div>

            
        </div>
    )
}