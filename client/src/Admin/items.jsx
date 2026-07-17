import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import API from "../api";

export default function Items(){

const navigate=useNavigate();

const admin=
JSON.parse(
localStorage.getItem("adminData")||"{}"
);

const[
books,
setBooks
]=useState([]);

useEffect(()=>{

loadBooks();

},[]);

const loadBooks=async()=>{

try{

const res=
await API.get("/user/books");

setBooks(res.data);

}

catch{

alert("Cannot Load Books");

}

};

const deleteBook=async(id)=>{

if(!window.confirm("Delete this Book?"))
return;

try{

await API.delete(`/seller/delete/${id}`);

loadBooks();

}

catch{

alert("Delete Failed");

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
cursor:"pointer",
fontWeight:"600"
}}
>

<span onClick={()=>navigate("/admin")}>

Home

</span>

<span onClick={()=>navigate("/users")}>

Users

</span>

<span onClick={()=>navigate("/sellers")}>

Sellers

</span>

<span>

Items

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

Book Inventory

</h1>

<div
style={{
width:"95%",
margin:"auto",
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"25px"
}}
>

{

books.map(book=>(

<div
key={book._id}
style={{
background:"white",
borderRadius:"12px",
padding:"15px",
boxShadow:"0 4px 15px rgba(0,0,0,.15)"
}}
>

<img

src={`http://localhost:5000/uploads/${book.image}`}

alt=""

style={{
width:"100%",
height:"220px",
objectFit:"cover",
borderRadius:"10px"
}}

/>

<h3
style={{
marginTop:"15px",
color:"#5b3d2e"
}}
>

{book.title}

</h3>

<p>

Author :
<b>

{book.author}

</b>

</p>

<p>

Seller :
<b>

{book.sellerName||"Unknown"}

</b>

</p>

<p>

Price :
<b>

₹ {book.price}

</b>

</p>

<p>

Stock :
<b>

{book.stock||0}

</b>

</p>
<div
style={{
marginTop:"20px",
display:"flex",
justifyContent:"center"
}}
>

<button

onClick={()=>deleteBook(book._id)}

style={{
background:"#c0392b",
color:"white",
border:"none",
padding:"12px 25px",
borderRadius:"8px",
cursor:"pointer",
fontSize:"16px",
fontWeight:"bold",
display:"flex",
alignItems:"center",
gap:"8px"
}}

>

<FaTrash />

Delete Book

</button>

</div>

</div>

))

}

</div>

</div>

);

}