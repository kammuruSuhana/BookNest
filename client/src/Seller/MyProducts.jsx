
import {useEffect,useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import API from "../api";

import Book from "./Book";
import "./List.css";

export default function MyProducts(){

const navigate=useNavigate();

const seller=

JSON.parse(

localStorage.getItem("sellerData")

||

"{}"

);

const[
books,
setBooks
]=useState([]);

useEffect(()=>{

loadBooks();

},[]);

const loadBooks=
async()=>{

try{

const res=

await API.get(
"/user/books"
);

const myBooks=

res.data.filter(

book=>

book.sellerId===seller._id

);

setBooks(myBooks);

}

catch{

alert(
"Cannot Load Books"
);

}

};

const removeBook=
async(id)=>{

if(

!window.confirm(

"Delete this book?"

)

)

return;

try{

await API.delete(

`/seller/delete/${id}`

);

loadBooks();

}

catch{

alert(
"Delete Failed"
);

}

};

const logout=()=>{

localStorage.removeItem(
"seller"
);

localStorage.removeItem(
"sellerData"
);

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
textDecoration:"none",
fontWeight:"bold"
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

{/* PAGE TITLE */}

<h1
style={{
textAlign:"center",
margin:"35px 0",
fontFamily:"Georgia",
color:"#5b3a29",
fontSize:"42px"
}}
>

Books List

</h1>

<div className="products-container">

{

books.length===0

?

<h2
style={{
textAlign:"center",
width:"100%"
}}
>

No Books Added

</h2>

:

books.map(book=>(

<Book

key={book._id}

book={book}

onDelete={removeBook}

/>

))

}

</div>

</div>

);

}

