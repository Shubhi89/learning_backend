// index.js
const express = require('express');
const app = express();
const PORT = 8080;

app.use((req,res,next) => {
    console.log(req);
    next();
});

app.get('/', (req, res) => {
  res.send('Hello Shubhi, Express is working!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
