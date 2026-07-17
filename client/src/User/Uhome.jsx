import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Uhome() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("userData") || "{}"
  );

  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {

    try {

      const res = await API.get("/user/books");

      setBooks(res.data);

    }

    catch (err) {

      console.log(err);

    }

  };

  const logout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("userData");

    navigate("/");

  };

  return (

    <div
      style={{
        background: "#f8f2df",
        minHeight: "100vh",
        fontFamily: "Georgia, serif"
      }}
    >

      {/* Navbar */}

      <div
        style={{
          height: "70px",
          background: "#8b4513",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 50px",
          boxShadow: "0 3px 10px rgba(0,0,0,.2)"
        }}
      >

        <h2
          style={{
            margin: 0,
            fontSize: "34px"
          }}
        >
          📚 BookNest
        </h2>

        <div
          style={{
            display: "flex",
            gap: "30px",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
            alignItems: "center"
          }}
        >

          <span onClick={() => navigate("/user")}>
            Home
          </span>

          <span onClick={() => navigate("/products")}>
            Books
          </span>

          <span>
            Wishlist
          </span>

          <span onClick={() => navigate("/myorders")}>
            My Orders
          </span>

          <span onClick={logout}>
            Logout
          </span>

          <span
            style={{
              fontStyle: "italic"
            }}
          >
            ({user.name})
          </span>

        </div>

      </div>

      {/* Best Seller */}

      <h1
        style={{
          textAlign: "center",
          color: "#4b2d1a",
          marginTop: "40px",
          fontSize: "60px"
        }}
      >
        Best Seller
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "35px",
          width: "88%",
          margin: "40px auto"
        }}
      >
        {

          books.slice(4,8).map((book)=>(

            <div

              key={book._id}

              style={{

                background:"white",

                borderRadius:"10px",

                overflow:"hidden",

                boxShadow:"0 4px 12px rgba(0,0,0,.2)",

                transition:"0.3s"

              }}

            >

              <img

                src={`http://localhost:5000/uploads/${book.image}`}

                alt={book.title}

                style={{

                  width:"100%",

                  height:"360px",

                  objectFit:"cover"

                }}

              />

              <div

                style={{

                  padding:"18px",

                  textAlign:"center"

                }}

              >

                <h2

                  style={{

                    color:"#4b2d1a",

                    fontSize:"26px",

                    marginBottom:"12px"

                  }}

                >

                  {book.title}

                </h2>

                <p

                  style={{

                    color:"#777",

                    marginBottom:"10px"

                  }}

                >

                  {book.author}

                </p>

                <h3

                  style={{

                    color:"#8b4513",

                    marginBottom:"15px"

                  }}

                >

                  ₹{book.price}

                </h3>

                <button

                  onClick={()=>navigate("/products")}

                  style={{

                    background:"#8b4513",

                    color:"white",

                    border:"none",

                    padding:"10px 22px",

                    borderRadius:"6px",

                    cursor:"pointer",

                    fontWeight:"bold"

                  }}

                >

                  View Book

                </button>

              </div>

            </div>

          ))

        }

      </div>

      {/* Footer */}

      <div

        style={{

          marginTop:"60px",

          background:"#8b4513",

          color:"white",

          textAlign:"center",

          padding:"30px"

        }}

      >

        <h2 style={{marginBottom:"10px"}}>

          📚 BookNest

        </h2>

        <p>

          Discover • Read • Learn • Grow

        </p>

      </div>
          </div>

  );

}