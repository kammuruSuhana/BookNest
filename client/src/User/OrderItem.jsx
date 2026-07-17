import { useLocation, useNavigate } from "react-router-dom";

export default function OrderItem() {

  const navigate = useNavigate();

  const { state } = useLocation();

  const order = state?.order;

  if (!order) {

    return <h2 style={{ textAlign: "center" }}>No Order Found</h2>;

  }

  return (

    <div
      style={{
        background: "#f8f2df",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Georgia, serif"
      }}
    >

      <button
        onClick={() => navigate(-1)}
        style={{
          background: "#8b4513",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        ← Back
      </button>

      <div
        style={{
          width: "80%",
          margin: "40px auto",
          display: "flex",
          gap: "40px",
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,.2)"
        }}
      >

        <img
          src={`http://localhost:5000/uploads/${order.image}`}
          alt={order.title}
          style={{
            width: "300px",
            height: "420px",
            objectFit: "cover"
          }}
        />

        <div>

          <h1>{order.title}</h1>

          <h3>Author : {order.author}</h3>

          <h3>Seller : {order.sellerName}</h3>

          <h2 style={{ color: "#8b4513" }}>
            ₹{order.price}
          </h2>

          <h3>
            Status : {order.status}
          </h3>

        </div>

      </div>

    </div>

  );

}