import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

/* HOME */

import Home from "./Components/Home";

/* USER */

import Login from "./User/Login";
import Signup from "./User/Signup";
import Uhome from "./User/Uhome";
import Products from "./User/Products";
import Wishlist from "./User/Wishlist";
import Uitem from "./User/Uitem";
import MyOrders from "./User/MyOrders";
import OrderItem from "./User/OrderItem";

/* SELLER */

import Slogin from "./Seller/Slogin";
import Ssignup from "./Seller/Ssignup";
import Shome from "./Seller/Shome";
import Addbook from "./Seller/Addbook";
import MyProducts from "./Seller/MyProducts";
import Orders from "./Seller/Orders";

/* ADMIN */

import Alogin from "./Admin/Alogin";
import Asignup from "./Admin/Asignup";
import Ahome from "./Admin/Ahome";
import Users from "./Admin/Users";
import Seller from "./Admin/Seller";
import Items from "./Admin/items";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />

        {/* USER */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/user"
          element={<Uhome />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        {/* BOOK DETAILS PAGE */}

        <Route
          path="/book/:id"
          element={<Uitem />}
        />

        <Route
          path="/myorders"
          element={<MyOrders />}
        />
          
          <Route
path="/wishlist"
element={<Wishlist/>}
/>

        {/* SELLER */}

        <Route
          path="/seller-login"
          element={<Slogin />}
        />

        <Route
          path="/seller-signup"
          element={<Ssignup />}
        />

        <Route
          path="/seller"
          element={<Shome />}
        />

        <Route
          path="/addbook"
          element={<Addbook />}
        />

        <Route
          path="/myproducts"
          element={<MyProducts />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        {/* ADMIN */}

        <Route
          path="/admin-login"
          element={<Alogin />}
        />

        <Route
          path="/admin-signup"
          element={<Asignup />}
        />

        <Route
          path="/admin"
          element={<Ahome />}
        />

        <Route
          path="/users"
          element={<Users />}
        />

        <Route
          path="/sellers"
          element={<Seller />}
        />

        <Route
          path="/items"
          element={<Items />}
        />

        <Route
  path="/orderitem"
  element={<OrderItem />}
/>

      </Routes>

    </BrowserRouter>

  );

}