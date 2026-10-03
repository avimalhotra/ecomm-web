import mongoose from "mongoose";
const Schema=mongoose.Schema;

const AdminSchema=new Schema({
     _id:mongoose.ObjectId,
     username:{type:String, required:true, trim:true, unique:true, dropdups:true,  minlength:3, maxlength:20},
     password:{type:String, required:true, trim:true,  minlength:6, maxlength:12}
},{collection:"admin"});

const Admin=mongoose.model("Admin",AdminSchema);

export default Admin;