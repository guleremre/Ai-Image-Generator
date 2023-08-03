import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";

import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import Link from "@mui/joy/Link";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [userInfo, setUserInfo] = useState([]);
  const [userId, setUserId] = useState("");
  // const [navImg, setNavImg] = useState();

  console.log(userInfo.imgUrl);

  function checkIfLogged() {
    const item = localStorage.getItem("token");
    if (!item) {
      return navigate("/home");
    }
  }
  //to get user id
  async function auth() {
    const url = "http://localhost:4000/user/verify";
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(url, { token });
      // console.log("response.data", response.data);
      const userName = userInfo.username;
      console.log("feyo", userInfo.username);
      console.log("feyoing", userInfo.imgUrl);
      setUserInfo(response.data);
      setUserId(response.data._id);

      console.log("userInfo", userInfo);
      console.log("userInfo userName", userName);
      console.log("userId", userId);
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  }

  //to use cloudinary widget for  img upload
  function UploadToWidget(userId) {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "djyfosrda",
        uploadPreset: "airtistic",
        cropping: true,
        folder: "user_profile",
        multiple: false,
      },

      function (error, result) {
        if (!error && result && result.event === "success") {
          const avatar = result.info.secure_url;
          put(avatar, userId);
        } else if (error) {
          console.error("Error uploading image:", error);
        }
      }
    );
  }

  async function put(avatar, userId) {
    try {
      const response = await axios.put(`http://localhost:4000/user/${userId}`, {
        imgUrl: avatar,
      });

      localStorage.setItem("NavImg", userInfo.imgUrl);
      const imgtoken = localStorage.setItem("NavImg", userInfo.imgUrl);
      console.log("imgtoken", imgtoken);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  useEffect(() => {
    checkIfLogged();
    auth(); // Call the auth function to get the userId
    UploadToWidget(userId);
  }, [userId]);

  return (
    <>
      <Stack
        sx={{
          p: 8,
          pt: 2,
          pb: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1>{`Profile of ${userInfo.username} `}</h1>
      </Stack>

      <main>
        <Sheet
          className=" profile"
          sx={{
            maxWidth: 300,
            mx: "left", // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "large",
          }}
          color="neutral"
          variant="soft"
        >
          <Stack
            sx={{
              m: "left",
              display: "flex",
              flexDirection: "column",
            }}
            direction="row"
            spacing={5}
          >
            <Avatar
              sx={{ width: 240, height: 240, alignSelf: "center" }}
              src={userInfo.imgUrl}
            />
          </Stack>
          <Button
            onClick={() => widgetRef.current.open()}
            variant="contained"
            color="primary"
            size="small"
          >
            Update Avatar
          </Button>
          <Stack direction="row" spacing={2}></Stack>
          <Typography level="h4" component="h1">
            <FormLabel>User Name</FormLabel>
            <b>{userInfo.username}</b>
          </Typography>

          <Typography level="h4" component="h1">
            <FormLabel>Email</FormLabel>
            <b>{userInfo.email}</b>
          </Typography>
        </Sheet>
        <Sheet className="favorites"></Sheet>
      </main>
    </>
  );
};

export default Profile;
