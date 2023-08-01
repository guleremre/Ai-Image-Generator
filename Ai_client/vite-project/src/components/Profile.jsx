import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";

const Profile = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleDeleteFavorite = async (id) => {
    console.log(token);
    console.log(id);
    try {
      const response = await axios.delete(`http://localhost:4000/user/${id}`, {
        data: { token: token },
      });
      console.log(response);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  function checkIfLogged() {
    if (!token) {
      alert("You need to logged in to see the page");
      return navigate("/home");
    }
  }

  const getUserData = async (req, res) => {
    try {
      const response = await axios.post("http://localhost:4000/user/verify", {
        token: token,
      });
      setUser(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const [Image, setImage] = useState("");
  const [imageLink, setImageLink] = useState("");

  async function uploadAvatar() {
  //  const api_key=""
  //  const cloud_key=""
    try {
      const data = new FormData();

      data.append("file", Image);
      data.append("upload_preset", "aigenerator");
      data.append("cloudName", "djyfosrda");
      await axios
        .post("https://api.cloudinary.com/v1_1/djyfosrda/image/upload")
        .then((data) => setImageLink(data.imageLink));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData();
    checkIfLogged();
  }, [token]);

  return (
    <div>
      <h1>Here is a list of your favorite </h1>
      <input
        type="file"
        onChange={(e) => {
          setImageLink(e.target.files[0]);
        }}
      />
      <button onClick={uploadAvatar}> Upload Avatar</button>
      <div>
        <ul>
          {user.favoriteBooks &&
            user.favoriteBooks.map((book, i) => (
              <li key={i}>
                <div className="card">
                  <img src={book.image} alt={book.name} />
                  <article>By {book.author}</article>
                  <h3>{book.name}</h3>
                  <p>{book.description}</p>
                  <h3>Rs: {book.price} $</h3>
                  {token ? <p>Available: {String(book.available)}</p> : ""}
                  <Button
                    onClick={() => {
                      handleDeleteFavorite(book._id);
                    }}
                    sx={{ mt: "auto" }}
                  >
                    Remove it from Favorite
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
