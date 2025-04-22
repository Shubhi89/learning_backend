const express = require("express");
const app = express();

let port = 8080;

app.listen(port , () => {
    console.log(`app listening on port ${port}`);
});

// app.use((req,res)=> {
//     console.log("request recieved");
//     res.send("this is our response");
// });

app.get("/" , (req,res)=> {
    res.send("you contacted root path");
});

app.get("/search",(req , res) => {
    res.send("you contacted search path");
});

app.get("*" , (req,res) => {
    res.send("this path does not exist");
});

app.get("/:username/:id" , (req , res) => {
    console.log(req.params);
    res.send("hello , i am here");
});