import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaBan, FaCheckCircle } from "react-icons/fa";
import API from "../api";
import "./Users.css";

export default function Users() {

  const navigate = useNavigate();

  const admin = JSON.parse(
    localStorage.getItem("adminData") || "{}"
  );

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {

    try {

      const res = await API.get("/admin/users");

      setUsers(res.data);

    }

    catch {

      alert("Cannot Load Users");

    }

  };

  const blockUser = async (id) => {

    try {

      await API.put(`/admin/manage/${id}`);

      loadUsers();

    }

    catch {

      alert("Action Failed");

    }

  };

  // View Orders Popup
  const viewOrders = async (id) => {

    try {

      const res = await API.get(`/admin/history/${id}`);

      setOrders(res.data);

      setShowPopup(true);

    }

    catch {

      alert("Cannot Load Orders");

    }

  };

  const logout = () => {

    localStorage.removeItem("admin");
    localStorage.removeItem("adminData");

    navigate("/");

  };

  return (

    <div className="users-page">

      <div className="admin-navbar">

        <div className="logo">

          BookStore (Admin)

        </div>

        <div className="menu">

          <span onClick={() => navigate("/admin")}>
            Home
          </span>

          <span>
            Users
          </span>

          <span onClick={() => navigate("/sellers")}>
            Sellers
          </span>

          <span onClick={logout}>
            Logout
          </span>

          <span>
            ({admin.name})
          </span>

        </div>

      </div>

      <h1 className="users-title">
        Users
      </h1>

      <div className="table-box">

        <table>

          <thead>

            <tr>

              <th>Sl No</th>

              <th>User ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Status</th>

              <th>Operations</th>

            </tr>

          </thead>

          <tbody>

            {users.map((u,index)=>(

              <tr key={u._id}>

                <td>{index+1}</td>

                <td>{u._id}</td>

                <td>{u.name}</td>

                <td>{u.email}</td>

                <td>

                  <span
                    className={
                      u.status==="Blocked"
                      ?
                      "blocked"
                      :
                      "active"
                    }
                  >

                    {
                      u.status==="Blocked"
                      ?
                      "Blocked"
                      :
                      "Active"
                    }

                  </span>

                </td>

                <td>

                  <button
                    className="view-btn"
                    onClick={()=>viewOrders(u._id)}
                  >

                    <FaEye />

                    &nbsp;

                    View Orders

                  </button>

                  {

                    u.status==="Blocked"

                    ?

                    <button
                      className="unblock-btn"
                      onClick={()=>blockUser(u._id)}
                    >

                      <FaCheckCircle />

                      &nbsp;

                      Unblock

                    </button>

                    :

                    <button
                      className="block-btn"
                      onClick={()=>blockUser(u._id)}
                    >

                      <FaBan />

                      &nbsp;

                      Block

                    </button>

                  }

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Orders Popup */}

      {showPopup && (

        <div className="popup-overlay">

          <div className="orders-popup">

            <h2>User Orders</h2>

            {

              orders.length===0

              ?

              <h3 className="no-order">
                No Orders Found
              </h3>

              :

              orders.map((o,index)=>(

                <div
                  className="order-card"
                  key={index}
                >

                  <img
                    src={`http://localhost:5000/uploads/${o.image}`}
                    alt=""
                  />

                  <div className="order-details">

                    <h3>{o.title}</h3>

                    <p><b>Author :</b> {o.author}</p>

                    <p><b>Buyer :</b> {o.buyer}</p>

                    <p><b>Seller :</b> {o.sellerName}</p>

                    <p><b>Status :</b> {o.status}</p>

                  </div>

                  <div className="price-box">

                    ₹ {o.price}

                  </div>

                </div>

              ))

            }

            <button
              className="close-popup"
              onClick={()=>setShowPopup(false)}
            >

              Close

            </button>

          </div>

        </div>

      )}

    </div>

  );

}