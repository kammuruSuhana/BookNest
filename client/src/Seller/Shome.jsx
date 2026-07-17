import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Shome() {

  const navigate = useNavigate();

  const seller = JSON.parse(
    localStorage.getItem("sellerData") || "{}"
  );

  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState(0);

  useEffect(() => {

    load();

  }, []);

  const load = async () => {

    try {

      const res = await API.get(
        `/seller/dashboard/${seller._id}`
      );

      setBooks(
        new Array(res.data.books).fill({})
      );

      setOrders(
        res.data.orders
      );

    }

    catch (err) {

      console.log(err);

    }

  };

  const logout = () => {

    localStorage.removeItem("seller");

    localStorage.removeItem("sellerData");

    navigate("/");

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#f8f2e7",
        fontFamily: "Arial,sans-serif"
      }}
    >

      {/* Navbar */}

      <div
        style={{
          height: "70px",
          background: "#7a4a25",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          color: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,.2)"
        }}
      >

        <h2
          style={{
            margin: 0,
            fontSize: "30px"
          }}
        >
           BookNest Seller
        </h2>

        <div
          style={{
            display: "flex",
            gap: "28px",
            fontWeight: "bold",
            cursor: "pointer",
            alignItems: "center"
          }}
        >

          <span onClick={() => navigate("/seller")}>
            Home
          </span>

          <span onClick={() => navigate("/myproducts")}>
            My Products
          </span>

          <span onClick={() => navigate("/addbook")}>
            Add Book
          </span>

          <span onClick={() => navigate("/orders")}>
            Orders
          </span>

          <span onClick={logout}>
            Logout
          </span>

          <span>
            ({seller.name})
          </span>

        </div>

      </div>

      <h1
        style={{
          textAlign: "center",
          color: "#5d3a1a",
          marginTop: "35px",
          fontSize: "42px"
        }}
      >
        Seller Dashboard
      </h1>
            {/* Dashboard */}

      <div
        style={{
          width: "90%",
          margin: "40px auto",
          background: "#fff",
          borderRadius: "15px",
          padding: "35px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.15)"
        }}
      >

        {/* Cards */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            gap: "30px",
            marginBottom: "60px"
          }}
        >

          {/* Books Card */}

          <div
            style={{
              width: "280px",
              height: "150px",
              background: "#8B5E3C",
              color: "white",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,.2)"
            }}
          >

            <h2>Total Books</h2>

            <h1
              style={{
                fontSize: "50px",
                margin: 0
              }}
            >
              {books.length}
            </h1>

          </div>

          {/* Orders Card */}

          <div
            style={{
              width: "280px",
              height: "150px",
              background: "#E6A817",
              color: "white",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,.2)"
            }}
          >

            <h2>Total Orders</h2>

            <h1
              style={{
                fontSize: "50px",
                margin: 0
              }}
            >
              {orders}
            </h1>

          </div>

        </div>

        {/* Graph */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "150px",
            height: "320px"
          }}
        >

          {/* Books Bar */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >

            <div
              style={{
                width: "80px",
                height: `${Math.max(books.length * 40, 40)}px`,
                background: "#4B6CB7",
                borderRadius: "10px 10px 0 0",
                transition: ".3s"
              }}
            ></div>

            <p
              style={{
                fontWeight: "bold",
                marginTop: "12px"
              }}
            >
              Books
            </p>

          </div>

          {/* Orders Bar */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >

            <div
              style={{
                width: "80px",
                height: `${Math.max(orders * 40, 40)}px`,
                background: "#F39C12",
                borderRadius: "10px 10px 0 0",
                transition: ".3s"
              }}
            ></div>

            <p
              style={{
                fontWeight: "bold",
                marginTop: "12px"
              }}
            >
              Orders
            </p>

          </div>

        </div>
        </div>
        </div>
        
);
}
