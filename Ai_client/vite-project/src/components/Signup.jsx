import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:4000/user/signup";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  //check If  user Logged
  function checkIfLogged() {
    const item = localStorage.getItem("token");
    if (item) {
      return navigate("/home");
    }
  }

  //checking if user entered same password
  function handleButtonClick() {
    if (password === confirmPassword) {
      onSubmit();
    } else {
      alert("passwords doesn't match");
    }
  }

  //Submit
  const onSubmit = async () => {
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
  };

  useEffect(() => {
    checkIfLogged();
  }, []);
  return (
    <CssVarsProvider>
      <main>
        <Sheet
          sx={{
            maxWidth: 300,
            mx: "auto",
            my: 4,
            py: 3,
            px: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign in to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>User Name</FormLabel>
            <Input
              // html input attribute
              name="username"
              type="text"
              placeholder="User Name"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              // html input attribute
              name="email"
              type="email"
              placeholder="shai@email.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              // html input attribute
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              // html input attribute
              name="password"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </FormControl>

          <Button
            onClick={() => {
              handleButtonClick();
            }}
            sx={{ mt: 1 }}
          >
            Sign up
          </Button>
          <Typography
            endDecorator={<Link href="/">Log in</Link>}
            fontSize="sm"
            sx={{ alignSelf: "center" }}
          >
            Do you have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}
