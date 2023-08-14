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
  // const token = localStorage.getItem("token");

  //Delete from favorites
  const handleDeleteFavorite = async (imgId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/user/${imgId}`,
        {
          // userId,
          data: { _id: imgId, userId },
        }
      );
      console.log(`19999`, userId);
      console.log(response.data);
      // setUser(response.data.userInfo);
    } catch (error) {
      console.log(error);
    }
    console.log(userId);
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
        console.log("auth user", user);
        console.log("auth useringo", userInfo);
        console.log("auth userId", userId);
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    }
    auth();
  }, []);

  return (
    <div>
      <h1>Here is a list of your favorite books</h1>

      <div>
        {userInfo.favoriteImg && (
          <ul>
            {userInfo.favoriteImg.map((item) => (
              <li key={item._id}>
                <img src={item.image} alt="Image cover" />
                <p>prompt={item.prompt} </p>
                <p>negative_prompt={item.negative_prompt} </p>
                <p>sampler_index={item.sampler_index} </p>
                <p>cfg_scale={item.steps} </p>
                <p>cfg_scale={item.cfg_scale} </p>

                <Button
                  sx={{ mt: 2, m: "auto" }}
                  variant="outlined"
                  onClick={() => {
                    handleDeleteFavorite(item._id);
                  }}
                >
                  Unfavorite
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* <Box sx={{ width: 500, height: 450, overflowY: "scroll" }}>
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
      </Box> */}
    </div>
  );
};

export default Favorites;
