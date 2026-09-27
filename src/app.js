import express from "express";
import path from "node:path";
import nunjucks from "nunjucks";

import apiRouter from "./routes/api.js";
import productRouter from "./routes/product.js";

import jwt from "jsonwebtoken";
import authenticate from "./jwtauth.js";


const app=express();
// Built-in middleware for parsing JSON
app.use(express.json());
// Built-in middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));
const port=process.env.PORT || 8080;


app.use(express.static(path.resolve("src/public")));
app.use(express.static(path.resolve("node_modules/bootstrap/dist")));


// configure
nunjucks.configure(path.resolve('src/public/views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
}); 

import mongoose from "./dao.js";
import Product from "./models/Product.js";
import Category from "./models/Category.js";

app.use("/api",apiRouter);
app.use("/products",productRouter);


app.get("/",(req,res)=>{
     res.status(200).render("index.html", { title:"Ecomm" });
});

app.get("/about",(req,res)=>{
     res.status(200).render("about.html",{ 
        title:"about Us", 
        cars:["swift","alto", "baleno", "brezza"], 
        car:{ name:"Brezza", engine:1000, power:110, torque: 170},
        id:22
     });
});

app.get("/contact",(req,res)=>{
     res.status(200).render("contact.html", { title:"Contact US" });
});

app.get("/signup",(req,res)=>{
     res.status(200).render("signup.html", { title:"Sign Up" });
});

app.get("/search",(req,res)=>{
     const item=req.query;
     console.log( item.product );
     
      Product.find({name:new RegExp(item.product)}).select("-_id")
          .then(results=>{
               res.status(200).render("search.html", { items:results });
          })
          .catch(err=>{
               res.status(200).render("search.html", { error:err });
          });
});

app.get("/admin",(req,res)=>{
     res.status(404).render("admin.html",{ title:"Hello Admin" });
});

app.post("/admin",(req,res)=>{

      const { email, pass } = req.body;

      if( email=="a@b" && pass==123456){
          const token=jwt.sign({
                id: 1,
                email,
                role: 'Admin'
            },
             process.env.JWT_SECRET,
             {
                expiresIn: '1h'
            }
          );

          res.cookie("token", token, {
               httpOnly: true,
               sameSite: "lax",
               maxAge: 60 * 60 * 1000
          });

          // return res.json({message: 'Login Successful',token});
          // return res.status(200).json({message:"success",token, decode:jwt.verify(token,process.env.JWT_SECRET)});
          return res.status(200).render('add.html',{title:"Add Products",message:"success",token, decode:jwt.verify(token,process.env.JWT_SECRET)});
      }

      res.status(401).json({ message: 'Invalid Email or Password'});
     //  res.status(404).render("admin.html",{ title:"Hello Admin" });
});

app.get("/add", authenticate ,(req,res)=>{
     res.status(404).render("add.html",{ title:"Add Products" });
});


app.get("/:cat",async (req,res)=>{

      const category = await Category.findOne({ slug: req.params.cat});
      
     Product.find({ category : category._id }).populate("category").select("-_id").then(i=>{
          
          res.status(200).render("category.html", { title:"Category", data:i });

      }).catch(()=>{
           res.status(404).render("error.html",{ title:"No Product Found" });
      });
       
});




/* wild card handler */
app.get('/*splat',(req,res)=>{
    res.status(404).render("error.html",{ title:"Page Not Found" });
});

app.listen(port,()=>console.log(`App running at http://127.0.0.1:${port}`));
