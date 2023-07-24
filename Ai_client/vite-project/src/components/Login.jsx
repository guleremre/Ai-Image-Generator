import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:4000/user/login";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const onSubmit = async () => {
    try {
      const response = await axios.post(url, { username, email, password });
      const data = response.data;
      console.log(response.data);
      console.log(data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        alert("If you don't have  account please signup");
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
            onSubmit();
          }}
        >
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
