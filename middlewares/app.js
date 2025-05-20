const express = require('express');
const app = express();
const PORT = 8080;
const ExpressError = require('./expressError');

app.use((req,res,next) => {
    console.log(req);
    next();
});

app.use("/api", (req,res,next) => {
    let {token} =  req.query;
    if(token === "giveaccess") {
        next();
    }
    throw new ExpressError("Access Denied", 401);
});

// async wrap
function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => {
            next(err);
        });
    };
}

app.use((err,req,res,next) => {
    console.log(err);
    res.status(500).send("Internal Server Error");
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
