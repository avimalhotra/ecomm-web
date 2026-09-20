import express from "express"
const router=express.Router();
import Product from "../models/Product.js";
import Category from "../models/Category.js";


router.get('/',(req,res)=>{
    res.status(200).send("api");
});

router.get('/search',(req,res)=>{
     const item=req.query.product;

     Product.find({name:new RegExp(item)}).select("name -_id")
     .then(results=>{
         if(results.length){
           return res.status(200).json(results);
         }
         res.status(200).json({"message":"no product found"});
     })
     .catch(err=>{
          console.warn(err)
     });     
});

router.get('/category',(req,res)=>{
     const item=req.query.q;

     Category.find({slug:new RegExp(item)}).select("name slug -_id")
     .then(results=>{
         if(results.length){
           return res.status(200).json(results);
         }
         res.status(200).json({"message":"no category found"});
     })
     .catch(err=>{
          console.warn(err)
     });     
});

router.get('/products',(req,res)=>{
     const item=req.query.q;

     Product.find({name:new RegExp(item)}).select("-_id")
     .then(results=>{
         if(results.length){
           return res.status(200).json(results);
         }
         res.status(200).json({"message":"no category found"});
     })
     .catch(err=>{
          console.warn(err)
     });     
});



export default router;