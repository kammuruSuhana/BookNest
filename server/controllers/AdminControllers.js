
const Admin=require("../models/Admin");
const Users=require("../models/Users");
const Seller=require("../models/Seller");

/* ===========================
   ADMIN REGISTER
=========================== */

exports.register=async(req,res)=>{

try{

const {name,email,password}=req.body;

const exists=await Admin.findOne({email});

if(exists){

return res.status(400).json({

msg:"Admin Already Exists"

});

}

await Admin.create({

name,
email,
password

});

res.json({

msg:"Admin Registered"

});

}

catch(err){

console.log(err);

res.status(500).json({

msg:"Signup Failed"

});

}

};

/* ===========================
   ADMIN LOGIN
=========================== */

exports.login=async(req,res)=>{

try{

const {email,password}=req.body;

const admin=

await Admin.findOne({

email,
password

});

if(!admin){

return res.status(401).json({

msg:"Invalid Credentials"

});

}

res.json({

token:"admin_token",

admin

});

}

catch(err){

console.log(err);

res.status(500).json({

msg:"Login Failed"

});

}

};

/* ===========================
   GET USERS
=========================== */

exports.users=async(req,res)=>{

try{

const users=

await Users.find();

res.json(users);

}

catch(err){

console.log(err);

res.status(500).json({

msg:"Cannot Load Users"

});

}

};

/* ===========================
   BLOCK / UNBLOCK USER
=========================== */

exports.manageUser=async(req,res)=>{

try{

const user=

await Users.findById(req.params.id);

if(!user){

return res.status(404).json({

msg:"User Not Found"

});

}

const newStatus=

user.status==="Blocked"

?

"Active"

:

"Blocked";

await Users.findByIdAndUpdate(

req.params.id,

{

status:newStatus

}

);

res.json({

msg:newStatus

});

}

catch(err){

console.log(err);

res.status(500).json({

msg:"Failed"

});

}

};

/* ===========================
   USER PURCHASE HISTORY
=========================== */

exports.history=async(req,res)=>{

try{

const user=

await Users.findById(req.params.id);

if(!user){

return res.status(404).json({

msg:"User Not Found"

});

}

res.json(

user.orders || []

);

}

catch(err){

console.log(err);

res.status(500).json({

msg:"Cannot Load"

});

}

};

/* ===========================
   SAVE ORDER
=========================== */

exports.addHistory=async(req,res)=>{

try{

const user=

await Users.findById(

req.params.id

);

if(!user){

return res.status(404).json({

msg:"User Not Found"

});

}

if(!user.orders){

user.orders=[];

}

user.orders.push({

title:req.body.title,

author:req.body.author,

image:req.body.image,

price:req.body.price,

buyer:req.body.buyer,

sellerId:req.body.sellerId,

sellerName:req.body.sellerName,

status:req.body.status || "Ordered"

});

await user.save();

res.json({

msg:"Order Saved"

});

}

catch(err){

console.log(err);

res.status(500).json({

msg:"Failed"

});

}

};

/* ===========================
   GET SELLERS
=========================== */

exports.sellers=async(req,res)=>{

try{

const sellers=

await Seller.find();

res.json(sellers);

}

catch(err){

console.log(err);

res.status(500).json({

msg:"Cannot Load Sellers"

});

}

};

/* ===========================
   APPROVE SELLER
=========================== */

exports.approve=async(req,res)=>{

try{

await Seller.findByIdAndUpdate(

req.params.id,

{

status:"Approved"

}

);

res.json({

msg:"Approved"

});

}

catch(err){

console.log(err);

res.status(500).json({

msg:"Failed"

});

}

};

/* ===========================
   BLOCK SELLER
=========================== */

exports.block=async(req,res)=>{

try{

await Seller.findByIdAndUpdate(

req.params.id,

{

status:"Blocked"

}

);

res.json({

msg:"Blocked"

});

}

catch(err){

console.log(err);

res.status(500).json({

msg:"Failed"

});

}

};

