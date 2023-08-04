import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Sheet from "@mui/joy/Sheet";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import { Stack, Typography, Input, Button } from "@mui/material";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";

const Profile = () => {
  // debugger;
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [userInfo, setUserInfo] = useState([]);
  const [userId, setUserId] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdatedUsername(userInfo.username);
    setUpdatedEmail(userInfo.email);
  };
  const cancel = () => {
    setIsEditing(false);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/user/${userId}`, {
        username: updatedUsername,
        email: updatedEmail,
      });

      // Update user info and exit edit mode
      setUserInfo({
        ...userInfo,
        username: updatedUsername,
        email: updatedEmail,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  //to get user id
  async function auth() {
    const url = "http://localhost:4000/user/verify";
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(url, { token });

      const userName = userInfo.username;

      // console.log("feyo username", userInfo.username);
      // console.log("feyoing", userInfo.imgUrl);
      // setUserInfo(response.data);
      setUserInfo((prevUserInfo) => ({ ...prevUserInfo, ...response.data }));
      setUserId(response.data._id);

      // console.log("userInfo", userInfo);
      // console.log("userInfo userName", userName);
      // console.log("userId", userId);
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
      async function (error, result) {
        if (!error && result && result.event === "success") {
          const avatar = result.info.secure_url;
          console.log("yasmeen", userId, avatar);
          await put(avatar, userId);
          // UploadToWidget(userId);
        } else if (error) {
          console.error("Error uploading image:", error);
        }
      }
    );
  }
  //to upload profile image
  async function put(avatar, userId) {
    console.log("yas", avatar);
    try {
      const response = await axios.put(`http://localhost:4000/user/${userId}`, {
        imgUrl: avatar,
      });
      // Update localStorage with the new image URL

      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        imgUrl: avatar,
      }));
      console.log(userInfo);
      console.log("localstorage", avatar);
      localStorage.setItem("avatarimg", avatar);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
  //user update users info
  async function updateInfo() {
    try {
      const response = await axios.put(`http://localhost:4000/user/${userId}`, {
        username,
        email,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await auth();
      UploadToWidget(userId);
    };
    fetchData();
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
            mx: "auto", // margin left & right
            my: 2, // margin top & bottom
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
            <FormLabel>
              <b>User Name</b>
            </FormLabel>
            <p>{userInfo.username}</p>
          </Typography>

          <Typography level="h4" component="h1">
            <FormLabel>
              <b>Email</b>
            </FormLabel>
            <p>{userInfo.email}</p>
          </Typography>
          {isEditing ? (
            <form onSubmit={handleUpdateSubmit}>
              <FormLabel>
                <b>User Name</b>
              </FormLabel>
              <Input
                type="text"
                value={updatedUsername}
                onChange={(e) => setUpdatedUsername(e.target.value)}
              />
              <FormLabel>
                <b>Email</b>
              </FormLabel>
              <Input
                type="email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
              >
                Update Info
              </Button>{" "}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                onClick={cancel}
              >
                Cancel
              </Button>
            </form>
          ) : (
            <Button
              onClick={handleEditClick}
              variant="contained"
              color="primary"
              size="small"
            >
              Edit Info
            </Button>
          )}
          {/* <Button>Open Dialog</Button> */}
        </Sheet>
        <Sheet className="favorites"></Sheet>
      </main>
    </>
  );
};

export default Profile;
