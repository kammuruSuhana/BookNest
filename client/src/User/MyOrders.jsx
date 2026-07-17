import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function MyOrders() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("userData") || "{}"
  );

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    loadOrders();

  }, []);

  const loadOrders = async () => {

    try {

      const res = await API.get(
        `/admin/history/${user._id}`
      );

      setOrders(res.data || []);

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
          background: "#8b4513",
          color: "white",
          height: "70px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 45px"
        }}
      >

        <h2>📚 BookNest</h2>

        <div
          style={{
            display: "flex",
            gap: "30px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >

          <span onClick={() => navigate("/user")}>
            Home
          </span>

          <span onClick={() => navigate("/products")}>
            Books
          </span>

          <span onClick={() => navigate("/wishlist")}>
            Wishlist
          </span>

          <span>
            My Orders
          </span>

          <span onClick={logout}>
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
          fontSize: "55px"
        }}
      >

        My Orders

      </h1>

      <div
        style={{
          width: "90%",
          margin: "40px auto"
        }}
      >

        {

          orders.length === 0 ?

          (

            <h2
              style={{
                textAlign: "center",
                color: "#777"
              }}
            >

              No Orders Yet

            </h2>

          )

          :

          orders.map((order, index) => (

            <div

              key={index}

              style={{

                display: "flex",

                alignItems: "center",

                background: "white",

                marginBottom: "25px",

                padding: "20px",

                borderRadius: "10px",

                boxShadow: "0 4px 12px rgba(0,0,0,.2)"

              }}

            >

              <img

                src={`http://localhost:5000/uploads/${order.image}`}

                alt={order.title}

                style={{

                  width: "120px",

                  height: "170px",

                  objectFit: "cover",

                  borderRadius: "8px"

                }}

              />

              <div
                style={{
                  flex: 1,
                  marginLeft: "25px"
                }}
              >

                <h2>{order.title}</h2>

                <p>
                  <b>Author :</b> {order.author}
                </p>

                <p>
                  <b>Seller :</b> {order.sellerName}
                </p>

                <h3
                  style={{
                    color: "#8b4513"
                  }}
                >
                  ₹{order.price}
                </h3>

                <p>
                  <b>Status :</b> {order.status}
                </p>

              </div>

              <button

                onClick={() =>
                  navigate("/orderitem", {
                    state: { order }
                  })
                }

                style={{

                  background: "#8b4513",

                  color: "white",

                  border: "none",

                  padding: "12px 25px",

                  borderRadius: "6px",

                  cursor: "pointer",

                  fontWeight: "bold"

                }}

              >

                View

              </button>

            </div>

          ))

        }

      </div>

      {/* Footer */}

      <div
        style={{
          marginTop: "80px",
          background: "#e8dfc7",
          textAlign: "center",
          padding: "35px"
        }}
      >

        <h2
          style={{
            color: "#8b4513"
          }}
        >
          📚 BookNest
        </h2>

        <p>
          "Every book opens a new world."
        </p>

        <h3>
          Contact : +91 9876543210
        </h3>

      </div>

    </div>

  );

}