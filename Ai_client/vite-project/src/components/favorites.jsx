import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";

const Favorites = () => {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [user39, setUser39] = useState([]);

  // const [favedImages, setFavedImages] = useState([]);

  const token = localStorage.getItem("token");
  //to get user info

  //Delete from favorites
  const handleDeleteFavorite = async (id) => {
    console.log(token);
    console.log(id);
    try {
      const response = await axios.delete(`http://localhost:4000/user/${id}`, {
        data: { token: token }, //////////////
      });
      setUser(response.data.userInfo);
    } catch (error) {
      console.log(error);
    }
  };
  // const deneme = console.log(userInfo?.map((item) => item.image));

  useEffect(() => {
    async function auth() {
      const url = "http://localhost:4000/user/verify";
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(url, { token });

        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, ...response.data }));
        setUser39((prevUser39) => ({
          ...prevUser39,
          ...response.data.favoriteImg,
        }));
        console.log(userInfo);
        setUserId(response.data._id);
      } catch (error) {
        console.error("Error verifying token:", error);
      }

      console.log(user39);
    }
    auth();
  }, [userId]);
  return (
    <div>
      <h1>Here is a list of your favorite books</h1>
      <div>
        <ul>
          {userInfo.favoriteImg &&
            userInfo.favoriteImg.map((item) => (
              <li>
                <img src={item.image} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
