import { useState } from "react"

type Props = {
  auth: boolean;
  setAuth: (auth: boolean) => any;
}

export const Login = (props: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please Fill in all Fields");
      return;
    }

    if (password === "interiit") {
      props.setAuth(true);
    } else {
      setError("wrong password");
      return;
    }

    console.log(email);
    console.log(password);
    console.log(error);

    setEmail("");
    setPassword("");
    setError("");
  }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
