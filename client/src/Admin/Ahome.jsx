import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Admin.css";

export default function Ahome() {

  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("adminData"));

  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState(0);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {

    try {

      const u = await API.get("/admin/users");
      const s = await API.get("/admin/sellers");
      const b = await API.get("/user/books");

      setUsers(u.data);
      setSellers(s.data);
      setBooks(b.data);

      let total = 0;

      u.data.forEach(user => {
        total += user.orders ? user.orders.length : 0;
      });

      setOrders(total);

    } catch (err) {
      console.log(err);
    }

  };

  const logout = () => {

    localStorage.removeItem("admin");
    localStorage.removeItem("adminData");

    navigate("/");

  };

  return (

    <div className="admin-page">

      {/* Navbar */}

      <div className="admin-navbar">

        <div className="logo">
          BookStore (Admin)
        </div>

        <div className="menu">

          <span onClick={() => navigate("/admin")}>Home</span>

          <span onClick={() => navigate("/users")}>Users</span>

          <span onClick={() => navigate("/sellers")}>Sellers</span>
          <span
onClick={()=>navigate("/items")}
>
Items
</span>

          <span onClick={logout}>Logout</span>

          <span>({admin?.name})</span>

        </div>

      </div>

      <h1 className="title">
        Admin Dashboard
      </h1>

      <div className="dashboard">

        <div className="cards">

          <div className="card users">
            <h2>USERS</h2>
            <h1>{users.length}</h1>
          </div>

          <div className="card vendors">
            <h2>Vendors</h2>
            <h1>{sellers.length}</h1>
          </div>

          <div className="card items">
            <h2>Items</h2>
            <h1>{books.length}</h1>
          </div>

          <div className="card orders">
            <h2>Total Orders</h2>
            <h1>{orders}</h1>
          </div>

        </div>

        {/* Fake Bar Chart */}

        <div className="graph">

          <div className="bar">

            <div
              className="fill purple"
              style={{ height: `${users.length * 40}px` }}
            ></div>

            <p>Users</p>

          </div>

          <div className="bar">

            <div
              className="fill cyan"
              style={{ height: `${sellers.length * 40}px` }}
            ></div>

            <p>Vendors</p>

          </div>

          <div className="bar">

            <div
              className="fill blue"
              style={{ height: `${books.length * 40}px` }}
            ></div>

            <p>Items</p>

          </div>

          <div className="bar">

            <div
              className="fill orange"
              style={{ height: `${orders * 40}px` }}
            ></div>

            <p>Orders</p>

          </div>

        </div>

      </div>

    </div>

  );

}