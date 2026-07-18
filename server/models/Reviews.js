const mongoose=require("mongoose");

module.exports=
mongoose.model(

"Reviews",

new mongoose.Schema({

userId:String,

bookId:String,

review:String

})

);
