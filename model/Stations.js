const mongoose=require('mongoose');


const StationSchema=new mongoose.Schema({
    name:{type:String,required:true}
})