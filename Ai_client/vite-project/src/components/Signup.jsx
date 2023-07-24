import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:4000/user/signup";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function handleButtonClick() {
    if (password === confirmPassword) {
      onSubmit();
    } else {
      alert("passwords doesn't match");
    }
  }
  //signup function
  async function onSubmit() {
    try {
      const response = await axios.post(url, { username, email, password });
      const data = response.data;
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/home");
        alert("Account created successfully");
      } else {
        response.data.msg;
        alert(response.data.msg); //Email or username already exists
      }
    } catch (error) {
      console.error("Error Signup:", error);
      alert("Error signing up. Please try again.");
    }
  }
  return (
    <>
      <form action="submit">
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
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button type="button" onClick={handleButtonClick}>
          Signup
        </button>
      </form>
    </>
  );
}

export default Signup;
