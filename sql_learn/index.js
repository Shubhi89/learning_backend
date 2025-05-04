const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

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
// try {
//   connection.query(q ,[data], (err , result)=> { 
//     if(err) throw err;
//     console.log(result);
//   });
// } catch (err) {
//   console.log(err);
// }

// connection.end();

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

app.listen(port , ()=> {
  console.log(`listening to port ${port}`);
});