const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;
const SECRET_KEY = "my_secret_key";

app.use(cors());
app.use(bodyParser.json());

const user = {
  email: "tegan@tegan",
  password: "interiit"
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid Credentials" });
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
