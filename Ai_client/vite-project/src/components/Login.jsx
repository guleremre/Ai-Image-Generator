import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Signup from "./signup";

const url = "http://localhost:4000/user/login";

function Login() {
  var [username, setUsername] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  const navigate = useNavigate();

  //   useEffect(() => {
  //     checkIfLogged();
  //   }),
  //     [];

  //   function checkIfLogged() {
  //     const item = localStorage.getItem("token");
  //     if (item) {
  //       return navigate("/home");
  //     }
  //   }

  const login = () => {
    try {
      const response = axios.post(url, { username, email, password });
      const data = response.data;
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        alert({ msg: "Wrong password" });
        navigate("/signup");
      }
    } catch (error) {
      console.log("Error Login:", error);
    }
  };

  //   function login() {
  //     axios
  //       .post(url, { username, email, password })
  //       .then(({ data }) => {
  //         console.log({ data });
  //         if (data.token) {
  //           localStorage.setItem("token", data.token);
  //           navigate("/home");
  //         } else {
  //           alert("Please login");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error login:", error);
  //         alert(data.msg);
  //       });
  //   }
  return (
    <>
      <form>
        <input
          type="text"
          placeholder="User Name"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="e-mail"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            login();
          }}
        >
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
