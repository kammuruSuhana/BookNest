

import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import API from "../api";

export default function Addbook(){

const navigate=useNavigate();

const seller=

JSON.parse(

localStorage.getItem("sellerData")

||

"{}"

);

const[book,setBook]=useState({

title:"",
author:"",
genre:"",
price:"",
description:""

});

const[image,setImage]=useState(null);

const logout=()=>{

localStorage.removeItem("seller");

localStorage.removeItem("sellerData");

navigate("/");

};

const addBook=
async()=>{

try{

const formData=new FormData();

formData.append("title",book.title);

formData.append("author",book.author);

formData.append("genre",book.genre);

formData.append("price",book.price);

formData.append("description",book.description);

formData.append("sellerId",seller._id);

formData.append("sellerName",seller.name);

formData.append("image",image);

await API.post(

"/seller/addbook",

formData,

{

headers:{

"Content-Type":"multipart/form-data"

}

}

);

alert("Book Added Successfully");

navigate("/myproducts");

}

catch(err){

console.log(err);

alert("Failed to Add Book");

}

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

BookStore (Seller)

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
style={{color:"white",textDecoration:"none"}}
>
Home
</Link>

<Link
to="/myproducts"
style={{color:"white",textDecoration:"none"}}
>
My Products
</Link>

<Link
to="/addbook"
style={{color:"white",fontWeight:"bold",textDecoration:"none"}}
>
Add Books
</Link>

<Link
to="/orders"
style={{color:"white",textDecoration:"none"}}
>
Orders
</Link>

<span>

({seller.name})

</span>

<button
onClick={logout}
style={{
background:"transparent",
border:"none",
color:"white",
cursor:"pointer"
}}
>

Logout

</button>

</div>

</div>


{/* FORM */}

<div
style={{
display:"flex",
justifyContent:"center",
alignItems:"center",
padding:"60px 20px"
}}
>

<div
style={{
background:"white",
width:"550px",
padding:"40px",
borderRadius:"15px",
boxShadow:"0 5px 20px rgba(0,0,0,.15)"
}}
>

<h1
style={{
textAlign:"center",
color:"#8b4513",
marginBottom:"30px",
fontFamily:"Georgia"
}}
>

Add Book

</h1>

<input

className="input"

placeholder="Book Title"

value={book.title}

onChange={(e)=>

setBook({

...book,

title:e.target.value

})

}

/>

<br/><br/>

<input

className="input"

placeholder="Author"

value={book.author}

onChange={(e)=>

setBook({

...book,

author:e.target.value

})

}

/>

<br/><br/>

<input

className="input"

placeholder="Genre"

value={book.genre}

onChange={(e)=>

setBook({

...book,

genre:e.target.value

})

}

/>

<br/><br/>

<input

type="number"

className="input"

placeholder="Price"

value={book.price}

onChange={(e)=>

setBook({

...book,

price:e.target.value

})

}

/>

<br/><br/>

<textarea

className="input"

placeholder="Description"

rows="4"

style={{
resize:"none"
}}

value={book.description}

onChange={(e)=>

setBook({

...book,

description:e.target.value

})

}

/>

<br/><br/>

<label
style={{
fontWeight:"bold"
}}
>

Upload Book Image

</label>

<br/><br/>

<input

type="file"

accept="image/*"

onChange={(e)=>

setImage(

e.target.files[0]

)

}

/>

<br/><br/><br/>

<button

className="btn-main"

style={{
width:"100%",
padding:"14px",
fontSize:"18px"
}}

onClick={addBook}

>

Add Book

</button>

</div>

</div>

</div>

);

}
