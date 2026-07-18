const mongoose=require("mongoose");

module.exports=
mongoose.model(

"Cart",

new mongoose.Schema({

userId:String,

items:Array

})

);