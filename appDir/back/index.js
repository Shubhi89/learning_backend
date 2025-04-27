const express = require("express");
const app = express();

const port = 8080;

// to parse post req data
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.post("/register" , (req , res) => {
    console.log(req.body);
    res.send("get accepted");
});

app.listen(port , () => {
    console.log("checked");
});