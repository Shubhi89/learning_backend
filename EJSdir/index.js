const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

// serving static files
app.use(express.static("public"));

// using ejs
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "/views"));

app.get("/" , (req , res) => {
    res.render("home.ejs");
});

app.listen(port , ()=> {
    console.log(`listening using port ${port}`);
});

app.get("/rolldice" , (req , res)=> {
    res.render("rolldice.ejs");
});

app.get("/ig/:username" , (req,res)=> {
    let {username} = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    if(data) {
        res.render("insta.ejs" , {data});
    } else {
        res.render("error.ejs");
    }
});
