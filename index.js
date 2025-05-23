const { render } = require("ejs");
const express = require("express");
const app= express();
const port = 8080;
const path = require("path");
const {v4 : uuidv4 }=require('uuid');
const methodOverride =require("method-override");


app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
 
app.use(express.static(path.join(__dirname, "public")));


//making array for working as a database;
let posts =[
    {
        id :uuidv4(),
        username : "Daksh",
        content  : "I love coding"
    },
    {
        id :uuidv4(),
        username : "Sachin",
        content  : "I love web development"
    },
    {
        id :uuidv4(),
        username : "Kunal",
        content  : "I love playing game"
    }
]


app.get("/posts",(req,res) =>{
    res.render("index.ejs",{ posts });
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;//destructure;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");//text,img,object
})
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
   
    let post =posts.find((p)=> id===p.id);
    res.render("show.ejs",{post});
})
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id===p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res) =>{
    let {id}=req.params;
    let post =  posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
})
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts =  posts.filter((p)=> id!==p.id);
    res.redirect("/posts")
})




app.listen(port,() => {
    console.log("Listening to port : 8080 ");
})