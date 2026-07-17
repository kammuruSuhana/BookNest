import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./User.css";

export default function Login() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const login = async () => {

    try {

      const res = await API.post(
        "/user/login",
        data
      );

      localStorage.setItem(
        "user",
        res.data.token
      );

      localStorage.setItem(
        "userData",
        JSON.stringify(res.data.user)
      );

      navigate("/user");

    }

    catch (err) {

      alert(
        err.response?.data?.msg ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h1>Login to User Account</h1>

        <label>Email address</label>

        <input
          type="email"
          placeholder="Email address"
          onChange={(e) =>
            setData({
              ...data,
              email: e.target.value
            })
          }
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setData({
              ...data,
              password: e.target.value
            })
          }
        />

        <button
          className="auth-btn"
          onClick={login}
        >
          Log in
        </button>

        <p className="bottom-text">

          Don't have an account?

          <span
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>

        </p>

      </div>

    </div>

  );

}