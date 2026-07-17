
import {useEffect,useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import API from "../api";

export default function Orders(){

const navigate=useNavigate();

const seller=

JSON.parse(

localStorage.getItem("sellerData")

||

"{}"

);

const[
orders,
setOrders
]=useState([]);

useEffect(()=>{

loadOrders();

},[]);

const loadOrders=
async()=>{

try{

const users=

await API.get("/admin/users");

let allOrders=[];

users.data.forEach(user=>{

if(user.orders){

user.orders.forEach(order=>{

if(

order.sellerName===seller.name

){

allOrders.push({

...order,

buyer:user.name

});

}

});

}

});

setOrders(allOrders);

}

catch(err){

console.log(err);

}

};

const logout=()=>{

localStorage.removeItem("seller");

localStorage.removeItem("sellerData");

navigate("/");

};

return(

<div
style={{
background:"#f7f1e3",
minHeight:"100vh"
}}
>

{/* NAVBAR */}

<div
style={{
background:"#8b4513",
padding:"15px 40px",
display:"flex",
justifyContent:"space-between",
alignItems:"center",
color:"white"
}}
>

<h2>

BookNest (Seller)

</h2>

<div
style={{
display:"flex",
gap:"25px",
alignItems:"center"
}}
>

<Link
to="/seller"
style={{
color:"white",
textDecoration:"none"
}}
>

Home

</Link>

<Link
to="/myproducts"
style={{
color:"white",
textDecoration:"none"
}}
>

My Products

</Link>

<Link
to="/addbook"
style={{
color:"white",
textDecoration:"none"
}}
>

Add Books

</Link>

<Link
to="/orders"
style={{
color:"white",
fontWeight:"bold",
textDecoration:"none"
}}
>

Orders

</Link>

<span
style={{
fontWeight:"bold"
}}
>

({seller.name})

</span>

<button

onClick={logout}

style={{

background:"transparent",

border:"none",

color:"white",

cursor:"pointer",

fontSize:"16px"

}}

>

Logout

</button>

</div>

</div>

<h1
style={{
textAlign:"center",
margin:"35px 0",
fontFamily:"Georgia",
color:"#5b3a29",
fontSize:"42px"
}}
>

Orders

</h1>

<div
style={{
padding:"20px 60px"
}}
>

{

orders.length===0

?

<h2
style={{
textAlign:"center"
}}
>

No Orders Yet

</h2>

:

orders.map((order,index)=>(

<div

key={index}

style={{

background:"white",

borderRadius:"12px",

padding:"20px",

marginBottom:"25px",

display:"grid",

gridTemplateColumns:
"160px 1fr 1fr auto",

gap:"25px",

alignItems:"center",

boxShadow:"0 4px 12px rgba(0,0,0,.15)"

}}

>

<img

src={`http://localhost:5000/uploads/${order.image}`}

alt={order.title}

style={{

width:"130px",

height:"170px",

objectFit:"cover",

borderRadius:"8px"

}}

/>

<div>

<h2>

{order.title}

</h2>

<p>

<b>

Author:

</b>

{order.author}

</p>

<p>

<b>

Buyer:

</b>

{order.buyer}

</p>

<p>

<b>

Seller:

</b>

{order.sellerName}

</p>

</div>

<div>

<p>

<b>

Status:

</b>

</p>

<p
style={{
color:"#0d6efd",
fontWeight:"bold"
}}
>

{

order.status

||

"Ordered"

}

</p>

</div>

<div>

<h2
style={{
color:"green"
}}
>

₹{order.price}

</h2>

</div>

</div>

))

}

</div>

</div>

);

}

