import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Profile = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [userId, setUserId] = useState([]);

  //to get user id
  async function auth() {
    const url = "http://localhost:4000/user/verify";
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(url, { token });
      console.log("response.data", response.data);
      const settedUserId = response.data._id;
      setUserId(settedUserId);
      // console.log("(response.data._id", response.data._id);
      // console.log("gsetuserdan gelen userId", userId);
      // localStorage.setItem("userId", response.data._id); // Store the userId in local storage
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  }

  function UploadToWidget(userId) {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "djyfosrda",
        uploadPreset: "airtistic",
        cropping: true,
        folder: "ai_generator",
        multiple: false,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          const avatar = result.info.secure_url;
          post(avatar, userId); // Call the post function with the image data and userId
          put(avatar, userId);
        } else if (error) {
          console.error("Error uploading image:", error);
        }
      }
    );
  }
  async function post(avatar, userId) {
    // axios.put("http://localhost:4000/user/" + userId , {imgUrl : clouridiray})
    const url = "http://localhost:4000/img/";
    try {
      var response = await axios.post(url, {
        avatar,
        userId, // Add the userId to the request
      });
      console.log("Upload successful!", response.data);
      console.log("postun ki", userId);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
  async function put(avatar, userId) {
    try {
      //  const response= await axios.put("http://localhost:4000/user/" + userId, { imgUrl: clouridiray });

      var response = await axios.put("http://localhost:4000/user/" + userId, {
        avatar,
        userId, // Add the userId to the request
      });
      console.log("bu avatarmı?", response.data);
      console.log("bu avatarmı2?", response);
      console.log("avatar mı", userId);
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
      <div>
        <h1>{`this is profile of ${userId} `}</h1>
        <h1>General Img</h1>
        <button onClick={() => widgetRef.current.open()}>Upload img</button>
      </div>

      <div>
        <button name="updateAvatar" onClick={() => widgetRef.current.open()}>
          Avatar img
        </button>
      </div>
    </>
  );
};

export default Profile;
