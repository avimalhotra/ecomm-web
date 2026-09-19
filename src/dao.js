import mongoose from "mongoose";
const db=mongoose.connection;

main().catch(err => console.log(err));   

async function main() {
      await mongoose.connect('mongodb://127.0.0.1:27017/ecomm');    
     //  `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` 

     console.log(`${db.name} Database Connected Successfully `);
}

db.on("error",err=>console.warn(err));
db.once("open",()=>console.log("db open"));

export default mongoose;