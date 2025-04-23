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

app.get("/home",(req , res) => {
    res.send("you contacted home path");
});

app.get("/:username/:id" , (req , res) => {
    console.log(req.params);
    res.send("hello , i am here");
});

app.get("/search" , (req,res)=> {
    let {q} = req.query;
    if(!q) {
        res.send('nothing searched');
    }
    res.send(`results for ${q}`);
});