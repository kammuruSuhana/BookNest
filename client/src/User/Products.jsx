import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Products() {

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

      alert("Unable to Load Books");

    }

  };

  const addWishlist = async (book) => {

    try {

      await API.put(

        `/user/wishlist/${user._id}`,

        {

          bookId: book._id,

          title: book.title,

          author: book.author,

          genre: book.genre,

          image: book.image,

          price: book.price,

          sellerName: book.sellerName

        }

      );

      alert("Book Added To Wishlist ❤️");

    }

    catch (err) {

      console.log(err);

      alert("Book Already Exists In Wishlist");

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
          background: "#8b4513",
          color: "white",
          height: "70px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px"
        }}
      >

        <h2
          style={{
            margin: 0,
            fontSize: "32px"
          }}
        >
          📚 BookNest
        </h2>

        <div
          style={{
            display: "flex",
            gap: "28px",
            alignItems: "center",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >

          <span onClick={() => navigate("/user")}>
            Home
          </span>

          <span>
            Books
          </span>

          <span
            onClick={() => navigate("/wishlist")}
          >
            Wishlist
          </span>

          <span
            onClick={() => navigate("/myorders")}
          >
            My Orders
          </span>

          <span
            onClick={logout}
          >
            Logout
          </span>

          <span>

            ({user.name})

          </span>

        </div>

      </div>

      {/* Heading */}

      <h1
        style={{
          textAlign: "center",
          color: "#5b3512",
          marginTop: "35px",
          fontSize: "55px"
        }}
      >
        Explore Books
      </h1>

      {/* Books */}

      <div
        style={{
          width: "90%",
          margin: "40px auto",
          display: "grid",
          gridTemplateColumns:
          "repeat(auto-fit,minmax(280px,1fr))",
          gap: "35px"
        }}
      >

        {

          books.map((book) => (

            <div

              key={book._id}

              style={{

                background: "white",

                borderRadius: "12px",

                overflow: "hidden",

                boxShadow:
                "0 5px 15px rgba(0,0,0,.18)"

              }}

            >

              <img

                src={`http://localhost:5000/uploads/${book.image}`}

                alt={book.title}

                style={{

                  width: "100%",

                  height: "340px",

                  objectFit: "cover"

                }}

              />

              <div
                style={{
                  padding: "18px"
                }}
              >

                <h2
                  style={{
                    color: "#4b2d1a"
                  }}
                >
                  {book.title}
                </h2>

                <p>

                  <b>Author :</b> {book.author}

                </p>

                <p>

                  <b>Genre :</b> {book.genre}

                </p>

                <p>

                  <b>Seller :</b> {book.sellerName}

                </p>

                <h2
                  style={{
                    color: "#8b4513"
                  }}
                >
                  ₹{book.price}
                </h2>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px"
                  }}
                >

                  <button

                    onClick={() => addWishlist(book)}

                    style={{

                      background: "#8b4513",

                      color: "white",

                      border: "none",

                      padding: "10px 16px",

                      borderRadius: "6px",

                      cursor: "pointer"

                    }}

                  >

                    ❤️ Wishlist

                  </button>

                  <button

                    onClick={() =>

                      navigate(`/book/${book._id}`)

                    }

                    style={{

                      background: "#5d4037",

                      color: "white",

                      border: "none",

                      padding: "10px 22px",

                      borderRadius: "6px",

                      cursor: "pointer"

                    }}

                  >

                    View

                  </button>

                </div>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}