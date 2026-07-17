import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../User/User.css";

export default function Alogin(){

const navigate=useNavigate();

const[data,setData]=useState({

email:"",
password:""

});

const login=async()=>{

try{

const res=await API.post(

"/admin/login",

data

);

localStorage.setItem(

"admin",

res.data.token

);

localStorage.setItem(

"adminData",

JSON.stringify(res.data.admin)

);

navigate("/admin");

}

catch(err){

alert(

err.response?.data?.msg ||

"Login Failed"

);

}

};

return(

<div className="auth-page">

<div className="auth-card">

<h1>Admin Login</h1>

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

onClick={login}

>

Login

</button>

<p className="bottom-text">

Don't have an account?

<span onClick={()=>navigate("/admin-signup")}>

Signup

</span>

</p>

</div>

</div>

);

}