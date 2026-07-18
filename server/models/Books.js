
const mongoose=require("mongoose");

const schema=new mongoose.Schema({

title:String,

author:String,

genre:String,

description:String,

price:Number,

image:String,

stock:Number,

sellerId:String,

sellerName:String

});

module.exports=

mongoose.model(

"Books",

schema

);

