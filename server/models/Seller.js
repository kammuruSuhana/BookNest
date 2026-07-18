const mongoose=
require(
"mongoose"
);

const schema=
new mongoose.Schema({

name:String,

email:String,

password:String,

status:{

type:String,

default:
"Pending"

}

});

module.exports=

mongoose.model(

"Seller",

schema

);