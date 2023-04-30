import express from "express";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const app = express();
// Set up Global configuration access
dotenv.config();

let PORT = process.env.PORT || 5000;

app.post("/user/generateToken", (req, res) => {
  let jwtKeySecrate = process.env.JWT_SECRET_KEY;

  let data = {
    time: new Date(),
    userId: 12
  }

  const token = jwt.sign(data, jwtKeySecrate);
  res.send(token);
});

app.get("/user/validateToken", (req, res) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) return res.send('Successfully verified!');
    else return res.status(401).send(error);
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
})

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});
