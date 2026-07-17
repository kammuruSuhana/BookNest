import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../User/User.css";

export default function Ssignup(){

const navigate=useNavigate();

const[data,setData]=useState({

name:"",
email:"",
password:""

});

const signup=async()=>{

try{

const res=await API.post(

"/seller/register",

data

);

alert(res.data.msg);

navigate("/seller-login");

}

catch(err){

alert(

err.response?.data?.msg ||

"Signup Failed"

);

}

};

return(

<div className="auth-page">

<div className="auth-card">

<h1>Seller Registration</h1>

<label>Name</label>

<input

placeholder="Name"

onChange={(e)=>

setData({

...data,

name:e.target.value

})

}

/>

<label>Email Address</label>

<input

type="email"

placeholder="Email Address"

onChange={(e)=>

setData({

...data,

email:e.target.value

})

}

/>

<label>Password</label>

<input

type="password"

placeholder="Password"

onChange={(e)=>

setData({

...data,

password:e.target.value

})

}

/>

<button

className="auth-btn"

onClick={signup}

>

Signup

</button>

<p className="bottom-text">

Already have an account?

<span

onClick={()=>navigate("/seller-login")}

>

Login

</span>

</p>

</div>

</div>

);

}