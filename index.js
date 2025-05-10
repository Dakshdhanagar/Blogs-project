const express = require("express");
const app= express();
const port = 8080;

const path = require("path");

app.use(express.urlencoded({extended : true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
 
app.use(express.static(path.join(__dirname, "public")));


//making array for working as a database;
let posts =[
    {
        username : "Daksh",
        content  : "I love coding"
    },
    {
        username : "Sachin",
        content  : "I love web development"
    },
    {
        username : "Kunal",
        content  : "I love playing game"
    }
]


app.get("/posts",(req,res) =>{
    res.render("index.ejs",{ posts });
})



app.listen(port,() => {
    console.log("Listening to port : 8080 ");
})