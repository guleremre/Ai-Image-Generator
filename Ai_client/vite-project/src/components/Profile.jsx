import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import Link from "@mui/joy/Link";
import { Stack } from "@mui/material";

const Profile = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [userInfo, setUserInfo] = useState([]);
  const [userId, setUserId] = useState("");

  console.log(userInfo.imgUrl);
  //to get user id
  async function auth() {
    const url = "http://localhost:4000/user/verify";
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(url, { token });
      // console.log("response.data", response.data);
      const settedUserInfo = response.data;
      const settedUserId = response.data._id;
      const userName = userInfo.username;
      console.log("feyo", userInfo.username);
      console.log("feyoing", userInfo.imgUrl);
      setUserInfo(settedUserInfo);
      setUserId(settedUserId);

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
          console.log(avatar);
          put(avatar, userId);
        } else if (error) {
          console.error("Error uploading image:", error);
        }
      }
    );
  }

  // async function post(avatar, userId) {
  //   // axios.put("http://localhost:4000/user/" + userId , {imgUrl : clouridiray})
  //   const url = "http://localhost:4000/img/";
  //   try {
  //     var response = await axios.post(url, {
  //       avatar,
  //       userId, // Add the userId to the request
  //     });
  //     console.log("Upload successful!", response.data);
  //     console.log("postun ki", userId);
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // }
  async function put(avatar, userId) {
    try {
      const response = await axios.put(`http://localhost:4000/user/${userId}`, {
        imgUrl: avatar,
      });
      var imgs = userInfo.imgUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  useEffect(() => {
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
      <CssVarsProvider>
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

            {/* <Typography
              endDecorator={<Link href="/">log in</Link>}
              fontSize="sm"
              sx={{ alignSelf: "center" }}
            >
              Do you have an account?
            </Typography> */}
          </Sheet>
          <Sheet className="favorites"></Sheet>
        </main>
      </CssVarsProvider>
    </>
  );
};

export default Profile;
