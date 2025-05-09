const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverRide = require("method-override");

app.use(methodOverRide("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine" , "ejs");
app.set("views",path.join(__dirname , "/views"));

const connection =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'college',
    password: 'shubhi123'
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password()
  ];
}
// let q = "INSERT INTO newuser (id , username , email , password) VALUES ?";

// let data = [];
// for(let i=0;i<100;i++) {
//   data.push(getRandomUser());
// }

// home page route
app.get("/" , (req , res)=> {
  let q = "select count(*) from newuser";
  try {
  connection.query(q ,(err , result)=> { 
    if(err) throw err;
    let count = result[0]["count(*)"];
    res.render("home.ejs" , {count});
  });
} catch (err) {
  console.log(err);
  res.send("some error in database");
}
});

// show users route
app.get("/user" , (req , res) => {
  let q = 'select * from newuser';
  try {
    connection.query(q ,(err , result)=> { 
      if(err) throw err;
      //res.send(result);
      res.render("users.ejs" , {result});
    });
  } catch (err) {
    console.log(err);
    res.send("some error in database");
  }
});

// edit username
app.get("/user/:id/edit" , (req , res) => {
  let {id} = req.params;
  let q = `select * from newuser where id = '${id}'`;
  try {
    connection.query(q ,(err , result)=> { 
      if(err) throw err;
      let user = result[0];
      res.render("edit.ejs" , {user});
    });
  } catch (err) {
    console.log(err);
    res.send("some error in database");
  }
});

// update (db)
app.patch("/user/:id" , (req , res) => {
  let {id} = req.params;
  let {password:pass , username:newUser} = req.body;
  let q = `select * from newuser where id = '${id}'`;
  try {
    connection.query(q ,(err , result)=> { 
      if(err) throw err;
      let user = result[0];
      if(pass != user.password) {
        res.send("wrong");
      } else {
        let q2 = `update newuser set username='${newUser}' where id='${id}'`;
        connection.query(q2 , (err , result)=> {
          if(err) throw err;
          res.redirect("/user");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("some error in database");
  }
});

app.listen(port , ()=> {
  console.log(`listening to port ${port}`);
});