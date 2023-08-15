import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemButton from "@mui/joy/ListItemButton";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import BookmarkRemoveSharpIcon from "@mui/icons-material/BookmarkRemoveSharp";
import LoadingButton from "@mui/lab/LoadingButton";
const Favorites = () => {
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [favoritesChanged, setFavoritesChanged] = useState(false);
  const [openImageDialogs, setOpenImageDialogs] = useState([]);

  // to copy text
  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };
  // Function to toggle the open state of a specific image dialog
  const toggleImageDialog = (index) => {
    const newOpenStates = [...openImageDialogs];
    newOpenStates[index] = !newOpenStates[index];
    setOpenImageDialogs(newOpenStates);
  };

  //Delete from favorites
  const handleDeleteFavorite = async (imgId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/user/${imgId}`,
        {
          data: { _id: imgId, userId },
        }
      );
      setFavoritesChanged(true);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteConfirm = async (id) => {
    try {
      const confirmBox = window.confirm(
        "Do you really want to remove this from your favorite list?"
      );
      if (confirmBox === true) {
        await handleDeleteFavorite(id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    //to get user info
    async function auth() {
      const url = "http://localhost:4000/user/verify";
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(url, { token });
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, ...response.data }));
        setUserId(response.data._id);
        if (favoritesChanged) {
          console.log("Favorites changed flag is true");
          setFavoritesChanged(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    }
    auth();
  }, [userId, favoritesChanged, setFavoritesChanged]);
  return (
    <Card variant="outlined" sx={{ width: "95%", m: "auto", p: 0 }}>
      <h1>Here is a list of your favorite Images</h1>
      <List sx={{ py: "var(--ListDivider-gap)" }}>
        {userInfo.favoriteImg &&
          userInfo.favoriteImg
            .slice()
            .reverse()
            .map((item, index) => (
              <React.Fragment key={item._id}>
                <ListItem maxWidth="50%">
                  <ListItemButton sx={{ gap: 2 }}>
                    <AspectRatio
                      variant="outlined"
                      ratio="4/3"
                      objectFit="cover"
                      sx={{ flexBasis: 600 }}
                    >
                      <img
                        className="mapImg"
                        onClick={() => toggleImageDialog(index)}
                        src={`${item.image}?w=120&fit=crop&auto=format`}
                        srcSet={`${item.image}?w=120&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                      />
                    </AspectRatio>
                    <ListItemContent>
                      <Typography
                        level="body-sm"
                        onClick={() => handleCopyText(item.prompt)}
                      >
                        <b>
                          <ContentCopyRoundedIcon />
                          prompt:
                        </b>{" "}
                        {item.prompt.length >= 20
                          ? item.prompt.slice(0, 200) + "..."
                          : item.prompt}
                      </Typography>
                      <Typography
                        level="body-sm"
                        onClick={() => handleCopyText(item.negative_prompt)}
                      >
                        <b>
                          <ContentCopyRoundedIcon />
                          negative_prompt:
                        </b>
                        {item.negative_prompt.length >= 20
                          ? item.negative_prompt.slice(0, 200) + "..."
                          : item.negative_prompt}
                      </Typography>
                      <Typography
                        level="body-sm"
                        onClick={() => handleCopyText(item.sampler_index)}
                      >
                        <b>sampler_index:</b>
                        {item.sampler_index}
                      </Typography>
                      <Typography
                        level="body-sm"
                        onClick={() => handleCopyText(item.cfg_scale)}
                      >
                        <b>cfg_scale:</b>
                        {item.cfg_scale}
                      </Typography>
                      <Typography
                        level="body-sm"
                        onClick={() => handleCopyText(item.steps)}
                      >
                        <b>steps:</b>
                        {item.steps}
                      </Typography>
                      <LoadingButton
                        variant="contained"
                        size="medium"
                        sx={{
                          margin: "auto",
                          "&:hover": {
                            color: "red",
                            backgroundColor: "white",
                          },
                        }}
                        onClick={() => {
                          deleteConfirm(item._id);
                        }}
                      >
                        <BookmarkRemoveSharpIcon />
                      </LoadingButton>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                {index !== userInfo.favoriteImg.length - 1 && <ListDivider />}

                <Dialog
                  open={openImageDialogs[index]}
                  onClose={() => toggleImageDialog(index)}
                  maxWidth="md"
                  fullWidth
                >
                  <Box
                    noValidate
                    component="form"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        maxWidth: "100%",
                        // height: "auto",
                        transition: "width 0.2s ease",
                        marginBottom: 20,
                        transform: "scale(1)",
                      }}
                      src={item.image} //////////////////
                      alt="item.image"
                      onClick={() => toggleImageDialog(index)}
                    />
                    <Button
                      sx={{ mt: 2, m: "auto" }}
                      variant="outlined"
                      onClick={() => toggleImageDialog(index)}
                    >
                      Close
                    </Button>
                  </Box>
                </Dialog>
              </React.Fragment>
            ))}
      </List>
    </Card>
  );
};
export default Favorites;
