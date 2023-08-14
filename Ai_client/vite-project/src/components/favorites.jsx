import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const Favorites = () => {
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [user, setUser] = useState("");
  const [favoritesChanged, setFavoritesChanged] = useState(false);

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
        "Do you really want to delete this book?"
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
        setUser(response.data);
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
    <div>
      <h1>Here is a list of your favorite Images</h1>
      <div>
        {userInfo.favoriteImg && (
          <ul>
            {userInfo.favoriteImg
              .slice()
              .reverse()
              .map((item) => (
                <li key={item._id}>
                  <img src={item.image} alt="Image cover"  />
                  <p>prompt={item.prompt} </p>
                  <p>negative_prompt={item.negative_prompt} </p>
                  <p>sampler_index={item.sampler_index} </p>
                  <p>cfg_scale={item.steps} </p>
                  <p>cfg_scale={item.cfg_scale} </p>

                  <Button
                    sx={{ mt: 2, m: "auto" }}
                    variant="outlined"
                    onClick={() => {
                      deleteConfirm(item._id);
                    }}
                  >
                    Unfavorite
                  </Button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Favorites;

{
  /* <Box sx={{ width: 500, height: 450, overflowY: "scroll" }}>
  <ImageList variant="masonry" cols={3} gap={8}>
    {userInfo.favoriteImg.map((item) => (
      <ImageListItem key={item._id}>
        <img
          src={`${item.img}?w=248&fit=crop&auto=format`}
          srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={item.title}
          loading="lazy"
        />
        <p>prompt={item.prompt} </p>
        <p>negative_prompt={item.negative_prompt} </p>
        <p>sampler_index={item.sampler_index} </p>
        <p>cfg_scale={item.steps} </p>
        <p>cfg_scale={item.cfg_scale} </p>
      </ImageListItem>
    ))}
  </ImageList>
</Box> */
}
