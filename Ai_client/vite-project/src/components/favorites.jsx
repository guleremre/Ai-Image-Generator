import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";

const Favorites = () => {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [userInfo, setUserInfo] = useState("");

  const token = localStorage.getItem("token");

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

  useEffect(() => {
    //to get user info
    async function auth() {
      const url = "http://localhost:4000/user/verify";
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(url, { token });
        setUserInfo(response.data);
        console.log("favorites response.data", response.data);
        console.log("userInfo.favoriteImg", userInfo.favoriteImg);
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
        <ul>
          {userInfo.favoriteImg&&
            userInfo.favoriteImg.map((image, i) => (
              <li key={i}>
                <div className="card">
                  <img src={image} />
                  <p>{prompt}</p>
                  {/* <img src={book.image} alt={book.name} />
                  <article>By {book.author}</article>
                  <h3>{book.name}</h3>
                  <h3>Rs: {book.price} $</h3>
                  {token ? <p>Available: {String(book.available)}</p> : ""} */}
                  <Button
                    onClick={() => {
                      handleDeleteFavorite(image._id);
                    }}
                    sx={{ mt: "auto" }}
                  >
                    Remove Favorite
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
