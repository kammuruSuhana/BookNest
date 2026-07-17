import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaBan, FaCheckCircle } from "react-icons/fa";
import API from "../api";

export default function Seller() {

const navigate = useNavigate();

const admin = JSON.parse(
localStorage.getItem("adminData") || "{}"
);

const [sellers, setSellers] = useState([]);

const [selectedSeller, setSelectedSeller] = useState(null);

const [showDetails, setShowDetails] = useState(false);

useEffect(() => {

loadSellers();

}, []);

const loadSellers = async () => {

try {

const res = await API.get("/admin/sellers");

setSellers(res.data);

}

catch {

alert("Cannot Load Sellers");

}

};

const approveSeller = async(id)=>{

try{

await API.put(`/admin/approve/${id}`);

loadSellers();

if(selectedSeller){

setSelectedSeller({
...selectedSeller,
status:"Approved"
});

}

}

catch{

alert("Approve Failed");

}

};

const blockSeller = async(id)=>{

try{

await API.put(`/admin/block/${id}`);

loadSellers();

if(selectedSeller){

setSelectedSeller({
...selectedSeller,
status:"Blocked"
});

}

}

catch{

alert("Block Failed");

}

};

const logout=()=>{

localStorage.removeItem("admin");

localStorage.removeItem("adminData");

navigate("/");

};
return(

<div
style={{
background:"#f8f2e7",
minHeight:"100vh"
}}
>

{/* Navbar */}

<div
style={{
height:"70px",
background:"#6f4e37",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"0 40px",
color:"white"
}}
>

<h2>

BookStore (Admin)

</h2>

<div
style={{
display:"flex",
gap:"30px",
fontWeight:"600",
fontSize:"17px",
cursor:"pointer"
}}
>

<span onClick={()=>navigate("/admin")}>

Home

</span>

<span onClick={()=>navigate("/users")}>

Users

</span>

<span>

Sellers

</span>

<span onClick={logout}>

Logout

</span>

<span>

({admin.name})

</span>

</div>

</div>

<h1
style={{
textAlign:"center",
margin:"30px",
color:"#5b3d2e"
}}
>

Seller Management

</h1>

<div
style={{
width:"95%",
margin:"auto",
background:"white",
borderRadius:"12px",
boxShadow:"0 5px 15px rgba(0,0,0,.15)",
overflow:"hidden"
}}
>

<table
style={{
width:"100%",
borderCollapse:"collapse"
}}
>

<thead>

<tr
style={{
background:"#d7b98e"
}}
>

<th style={{padding:"18px"}}>Sl No</th>

<th>Seller ID</th>

<th>Name</th>

<th>Email</th>

<th>Status</th>

<th>Operations</th>

</tr>

</thead>

<tbody>

{

sellers.map((s,index)=>(

<tr
key={s._id}
style={{
textAlign:"center",
borderBottom:"1px solid #ececec"
}}
>

<td style={{padding:"18px"}}>

{index+1}

</td>

<td>

{s._id}

</td>

<td>

{s.name}

</td>

<td>

{s.email}

</td>

<td>

<span
style={{
fontWeight:"bold",
color:
s.status==="Approved"
?
"green"
:
s.status==="Blocked"
?
"red"
:
"#d97706"
}}
>

{s.status}

</span>

</td>

<td>

<button

onClick={()=>{

setSelectedSeller(s);

setShowDetails(true);

}}

style={{

background:"#8B5E3C",

color:"white",

border:"none",

padding:"10px 16px",

borderRadius:"6px",

marginRight:"10px",

cursor:"pointer"

}}

>

<FaEye/>

&nbsp;

View

</button>

{

s.status==="Approved"

?

<button

onClick={()=>blockSeller(s._id)}

style={{

background:"#c0392b",

color:"white",

border:"none",

padding:"10px 16px",

borderRadius:"6px",

cursor:"pointer"

}}

>

<FaBan/>

&nbsp;

Block

</button>

:

<button

onClick={()=>approveSeller(s._id)}

style={{

background:"#2e8b57",

color:"white",

border:"none",

padding:"10px 16px",

borderRadius:"6px",

cursor:"pointer"

}}

>

<FaCheckCircle/>

&nbsp;

Approve

</button>

}

</td>

</tr>

))

}

</tbody>

</table>

</div>


{

showDetails && selectedSeller &&

<div
style={{
width:"95%",
margin:"35px auto",
background:"white",
borderRadius:"12px",
padding:"30px",
boxShadow:"0 5px 15px rgba(0,0,0,.15)"
}}
>

<h2
style={{
textAlign:"center",
color:"#6f4e37",
marginBottom:"30px"
}}
>


</h2>

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(2,1fr)",
gap:"25px",
fontSize:"18px"
}}
>

<div>

<b>Seller ID</b>

<p
style={{
marginTop:"8px",
color:"#666"
}}
>

{selectedSeller._id}

</p>

</div>

<div>

<b>Name</b>

<p
style={{
marginTop:"8px"
}}
>

{selectedSeller.name}

</p>

</div>

<div>

<b>Email</b>

<p
style={{
marginTop:"8px"
}}
>

{selectedSeller.email}

</p>

</div>

<div>

<b>Status</b>

<p
style={{
marginTop:"8px",
fontWeight:"bold",
color:
selectedSeller.status==="Approved"
?
"green"
:
selectedSeller.status==="Blocked"
?
"red"
:
"#d97706"
}}
>

{selectedSeller.status}

</p>

</div>

</div>

<hr
style={{
margin:"30px 0"
}}
/>

<div
style={{
display:"flex",
justifyContent:"center",
gap:"20px"
}}
>

<button

onClick={()=>approveSeller(selectedSeller._id)}

style={{
background:"#2e8b57",
color:"white",
border:"none",
padding:"12px 28px",
borderRadius:"8px",
cursor:"pointer",
fontSize:"16px"
}}
>

<FaCheckCircle/>

&nbsp;

Approve

</button>

<button

onClick={()=>blockSeller(selectedSeller._id)}

style={{
background:"#c0392b",
color:"white",
border:"none",
padding:"12px 28px",
borderRadius:"8px",
cursor:"pointer",
fontSize:"16px"
}}
>

<FaBan/>

&nbsp;

Block

</button>

<button

onClick={()=>setShowDetails(false)}

style={{
background:"#8B5E3C",
color:"white",
border:"none",
padding:"12px 28px",
borderRadius:"8px",
cursor:"pointer",
fontSize:"16px"
}}
>

Back

</button>

</div>

</div>

}

</div>

);

}