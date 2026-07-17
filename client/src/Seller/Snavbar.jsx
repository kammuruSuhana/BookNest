import {Link}
from "react-router-dom";

export default function Snavbar(){

return(

<div
style={{

display:"flex",
gap:"20px",
padding:"20px"

}}
>

<Link to="/seller">

Dashboard</Link>

<Link to="/addbook">

Add Book</Link>

<Link to="/myproducts">

My Products</Link>

<Link to="/orders">

Orders</Link>

</div>

);

}