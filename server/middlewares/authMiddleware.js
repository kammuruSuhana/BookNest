const jwt=require("jsonwebtoken");

module.exports=
(req,res,next)=>{

try{

const token=
req.headers.authorization;

if(!token)
return res.status(401)
.json({
msg:"Login Required"
});

const decode=
jwt.verify(
token.split(" ")[1],
process.env.JWT_SECRET
);

req.user=
decode;

next();

}

catch{

res.status(401)
.json({
msg:"Invalid Token"
});

}

};