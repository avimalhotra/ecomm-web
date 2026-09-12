import mongoose from "mongoose";
const Schema=mongoose.Schema;

const ProductSchema=new Schema({
     _id:mongoose.ObjectId,
     name:{type:String, required:String, trim:true, minlength:2, maxlength:50},
     mrp:{type:Number,required: true, min:1, max:9999999 },
     discount:{type:Number,required:false,min:0,max:100},
     ratings:{type:Number,required:true,min:0,max:5}
},{collection:"product"});

const Product=mongoose.model("Product",ProductSchema);

export default Product;