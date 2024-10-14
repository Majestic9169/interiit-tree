import axios from "axios";
import { useState } from "react"
import "./Login.css"

type Props = {
  onLogin: () => any
}

export const Login = (props: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      sessionStorage.setItem("token", response.data.token);
      props.onLogin();
    } catch (err) {
      setError('Invalid Credentials');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Enter Credentials</h2>
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-container">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-container">
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-button" type="submit">Login</button>
      </form>
    </div>
  )
}
