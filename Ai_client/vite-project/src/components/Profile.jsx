import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Sheet from "@mui/joy/Sheet";
import FormLabel from "@mui/joy/FormLabel";
import { Stack, Typography, Input, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const Profile = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [userInfo, setUserInfo] = useState([]);
  const [userId, setUserId] = useState("");

  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  //to update user info
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

      handleClose();
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
      setUserInfo((prevUserInfo) => ({ ...prevUserInfo, ...response.data }));
      setUserId(response.data._id);
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
          console.log("yasmeen", result.info);
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
    console.log("yasmin", avatar);
    try {
      const response = await axios.put(`http://localhost:4000/user/${userId}`, {
        imgUrl: avatar,
      });
      // Update localStorage with the new image URL
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        imgUrl: avatar,
      }));
      // console.log(userInfo);
      // console.log("localstorage", avatar);
      localStorage.setItem("avatarimg", avatar);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setUpdatedUsername(userInfo.username);
    setUpdatedEmail(userInfo.email);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
            mx: "auto", 
            my: 2, 
            py: 3, 
            px: 2, 
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "md",
            boxShadow: "xl",
          }}
          color="primary"
          variant="soft"
        >
          <Avatar
            sx={{ width: 240, height: 240, alignSelf: "center" }}
            src={userInfo.imgUrl}
          />
          <Button
            onClick={() => widgetRef.current.open()}
            variant="contained"
            color="primary"
            size="small"
          >
            Update Avatar
          </Button>
          <Typography level="h4" component="h2">
            <FormLabel>
              <b>User Name</b>
            </FormLabel>
            <body2>{userInfo.username}</body2>
          </Typography>
          <Typography level="h4" component="h2">
            <FormLabel>
              <b>Email</b>
            </FormLabel>
            <body2>{userInfo.email}</body2>
          </Typography>
          <Button
            onClick={handleClickOpen}
            variant="contained"
            color="primary"
            size="small"
          >
            Edit Info
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update User Information</DialogTitle>
            <DialogContent>
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
              </form>
              <br />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                onClick={handleUpdateSubmit}
              >
                Update Info
              </Button>{" "}
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </DialogContent>
          </Dialog>
        </Sheet>
      </main>
    </>
  );
};

export default Profile;
