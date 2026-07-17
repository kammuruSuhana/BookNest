import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

export default function Uitem() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  useEffect(() => {
    loadBook();
  }, []);

  const loadBook = async () => {

    try {

      const res = await API.get("/user/books");

      const selected = res.data.find(b => b._id === id);

      setBook(selected);

    }

    catch (err) {

      console.log(err);

    }

  };

  const buyNow = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("userData") || "{}"
      );

      const order = {

        buyerId: user._id,

        buyer: user.name,

        title: book.title,

        author: book.author,

        image: book.image,

        price: book.price,

        sellerId: book.sellerId,

        sellerName: book.sellerName,

        status: "Ordered"

      };

      await API.put(

        `/admin/history/${user._id}`,

        order

      );

      alert("Order Placed Successfully");

      navigate("/myorders");

    }

    catch (err) {

      console.log(err);

      alert("Order Failed");

    }

  };

  if (!book) {

    return (

      <h2
        style={{
          textAlign: "center",
          marginTop: "100px"
        }}
      >
        Loading...
      </h2>

    );

  }

  return (

    <div
      style={{
        background: "#f8f2df",
        minHeight: "100vh",
        padding: "40px"
      }}
    >

      {/* Book Image */}

      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >

        <img

          src={`http://localhost:5000/uploads/${book.image}`}

          alt={book.title}

          style={{

            width: "330px",

            height: "500px",

            objectFit: "cover",

            borderRadius: "8px",

            boxShadow: "0 5px 15px rgba(0,0,0,.2)"

          }}

        />

      </div>

      {/* Description & Info */}

      <div

        style={{

          display: "flex",

          justifyContent: "center",

          gap: "40px",

          marginTop: "40px",

          flexWrap: "wrap"

        }}

      >

        {/* Description */}

        <div

          style={{

            width: "500px",

            background: "white",

            borderRadius: "10px",

            padding: "30px",

            boxShadow: "0 3px 10px rgba(0,0,0,.15)"

          }}

        >

          <h2

            style={{

              color: "#5b3d2e",

              borderBottom: "2px solid #d7b28d",

              paddingBottom: "10px"

            }}

          >

            Description

          </h2>

          <p

            style={{

              fontSize: "20px",

              lineHeight: "1.7",

              marginTop: "25px"

            }}

          >

            {book.description}

          </p>

        </div>

        {/* Info */}

        <div

          style={{

            width: "500px",

            background: "white",

            borderRadius: "10px",

            padding: "30px",

            boxShadow: "0 3px 10px rgba(0,0,0,.15)"

          }}

        >

          <h2

            style={{

              color: "#5b3d2e",

              borderBottom: "2px solid #d7b28d",

              paddingBottom: "10px"

            }}

          >

            Info

          </h2>

          <div

            style={{

              marginTop: "25px",

              fontSize: "22px",

              lineHeight: "2"

            }}

          >

            <p>

              <b>Title:</b> {book.title}

            </p>

            <p>

              <b>Author:</b> {book.author}

            </p>

            <p>

              <b>Genre:</b> {book.genre}

            </p>

            <p>

              <b>Price:</b> ₹{book.price}

            </p>

            <p>

              <b>Seller:</b> {book.sellerName}

            </p>

          </div>

        </div>

      </div>

      {/* Buy Button */}

      <div

        style={{

          display: "flex",

          justifyContent: "center",

          marginTop: "40px"

        }}

      >

        <button

          onClick={buyNow}

          style={{

            background: "#b07a38",

            color: "white",

            border: "none",

            padding: "15px 45px",

            fontSize: "24px",

            borderRadius: "8px",

            cursor: "pointer",

            fontWeight: "bold"

          }}

        >

          Buy Now

        </button>

      </div>

    </div>

  );

}