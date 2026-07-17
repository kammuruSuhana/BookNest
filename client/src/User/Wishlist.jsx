import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Wishlist() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("userData") || "{}"
  );

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {

    loadWishlist();

  }, []);

  const loadWishlist = async () => {

    try {

      const res = await API.get(
        `/user/wishlist/${user._id}`
      );

      setWishlist(res.data);

    }

    catch (err) {

      console.log(err);

    }

  };

  const removeWishlist = async (bookId) => {

    try {

      await API.delete(
        `/user/wishlist/${user._id}/${bookId}`
      );

      alert("Removed From Wishlist");

      loadWishlist();

    }

    catch (err) {

      console.log(err);

      alert("Remove Failed");

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
          padding: "0 45px"
        }}
      >

        <h2
          style={{
            margin: 0
          }}
        >
          📚 BookNest
        </h2>

        <div
          style={{
            display: "flex",
            gap: "28px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >

          <span
            onClick={() => navigate("/user")}
          >
            Home
          </span>

          <span
            onClick={() => navigate("/products")}
          >
            Books
          </span>

          <span>
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

        </div>

      </div>

      {/* Heading */}

      <h1
        style={{
          textAlign: "center",
          color: "#5b3512",
          marginTop: "35px",
          fontSize: "52px"
        }}
      >
        ❤️ My Wishlist
      </h1>

      {

        wishlist.length === 0 ?

        (

          <h2
            style={{
              textAlign: "center",
              marginTop: "100px",
              color: "#777"
            }}
          >

            Your Wishlist is Empty

          </h2>

        )

        :

        (

          <div
            style={{
              width: "88%",
              margin: "40px auto",
              display: "grid",
              gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
              gap: "35px"
            }}
          >

            {

              wishlist.map((book) => (

                <div

                  key={book.bookId}

                  style={{

                    background: "white",

                    borderRadius: "12px",

                    overflow: "hidden",

                    boxShadow:
                    "0 4px 12px rgba(0,0,0,.2)"

                  }}

                >

                  <img

                    src={`http://localhost:5000/uploads/${book.image}`}

                    alt={book.title}

                    style={{

                      width: "100%",

                      height: "320px",

                      objectFit: "cover"

                    }}

                  />

                  <div
                    style={{
                      padding: "18px"
                    }}
                  >

                    <h2>

                      {book.title}

                    </h2>

                    <p>

                      <b>Author :</b>

                      {book.author}

                    </p>

                    <p>

                      <b>Genre :</b>

                      {book.genre}

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
                        gap: "10px",
                        marginTop: "18px"
                      }}
                    >

                      <button

                        onClick={() =>

                          navigate(

                            `/book/${book.bookId}`

                          )

                        }

                        style={{

                          background: "#6b4f36",

                          color: "white",

                          border: "none",

                          padding: "10px 18px",

                          borderRadius: "6px",

                          cursor: "pointer"

                        }}

                      >

                        View

                      </button>

                      <button

                        onClick={() =>

                          removeWishlist(

                            book.bookId

                          )

                        }

                        style={{

                          background: "#c0392b",

                          color: "white",

                          border: "none",

                          padding: "10px 18px",

                          borderRadius: "6px",

                          cursor: "pointer"

                        }}

                      >

                        Remove

                      </button>

                    </div>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}