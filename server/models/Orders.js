const mongoose=require("mongoose");

const schema=
new mongoose.Schema({

userId:String,

books:Array,

total:Number,

status:{
type:String,
default:"Pending"
}

});

module.exports=
mongoose.model(
"Orders",
schema
);