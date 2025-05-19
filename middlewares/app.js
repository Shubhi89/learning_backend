const express = require('express');
const app = express();
const PORT = 8080;

app.use((req,res,next) => {
    console.log(req);
    next();
});

app.use("/api", (req,res,next) => {
    let {token} =  req.query;
    if(token === "giveaccess") {
        next();
    }
    res.send("Access Denied");
});

app.get("/api", (req, res) => {
    res.send("Access Granted");
});

app.get('/', (req, res) => {
  res.send('Hello Shubhi, Express is working!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
