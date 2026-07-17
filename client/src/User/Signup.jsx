import {useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "../api";
import "./User.css";

export default function Signup(){

const navigate=useNavigate();

const[data,setData]=useState({

name:"",
email:"",
password:""

});

const signup=async()=>{

try{

const res=await API.post(

"/user/register",

data

);

alert(res.data.msg);

navigate("/login");

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

<h1>User Registration</h1>

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

<label>Email address</label>

<input

placeholder="Email address"

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

onClick={()=>navigate("/login")}

>

Login

</span>

</p>

</div>

</div>

);

}