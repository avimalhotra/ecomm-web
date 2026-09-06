import mongoose from "mongoose";
const Schema=mongoose.Schema;


const PinSchema=new Schema({
     _id:mongoose.ObjectId,
     officeName:String,
     pincode:Number,
     taluk:String,
     districtName:String,
     stateName:String,
},{collection:"pincode"});

const CarSchema=new Schema({
     _id:mongoose.ObjectId,
     name:{type:String, required:String, trim:true, minlength:3, maxlength:20},
     type:{type:String,required: true,enum: ['sedan', 'suv', 'hatchback'] },
     price:{type:Number,required:true,min:100000,max:10000000}
},{collection:"suzuki"});


const Car=mongoose.model("Car",CarSchema);
const Pin=mongoose.model("Pin",PinSchema);


async function main() {
      await mongoose.connect('mongodb://127.0.0.1:27017/node');
    
     //  use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` 
     //  if authentication is enabled
     
//     Car.find({name: "vitara"})
//      .then(results => {
//       console.log("Found cars:", results);
//      })
//      .catch(err => {
//       console.error("Query error:", err);
//      });

     Pin.find({pincode: 201301})
     .then(results => {
      console.log("Found cars:", results);
     })
     .catch(err => {
      console.error("Query error:", err);
     });

     //  console.log("Database Connected Successfully");
}

main().catch(err => console.log(err));   

