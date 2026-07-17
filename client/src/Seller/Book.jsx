
import "./List.css";

export default function Book({

book,
onDelete

}){

return(

<div className="book-card">

<button

className="delete-btn"

onClick={()=>onDelete(book._id)}

>

🗑

</button>

<img

src={`http://localhost:5000/uploads/${book.image}`}

alt={book.title}

className="book-image"

/>

<div className="book-details">

<h2>

{book.title}

</h2>

<p>

<b>Author:</b>

{book.author}

</p>

<p>

<b>Genre:</b>

{book.genre || "General"}

</p>

<p>

<b>Price:</b>

₹{book.price}

</p>

<p>

<b>Description:</b>

{

book.description

||

"No Description"

}

</p>

</div>

</div>

);

}

