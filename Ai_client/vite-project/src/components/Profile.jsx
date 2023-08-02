import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Profile = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [userId, setUserId] = useState("");

  //to get user id
  async function auth() {
    const url = "http://localhost:4000/user/verify";
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(url, { token });
      console.log(response.data);
      setUserId(response.data._id);
      console.log(response.data._id);
      console.log("gsetuserdan gelen", userId);
      // localStorage.setItem("userId", response.data._id); // Store the userId in local storage
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  }

  function UploadToWidget() {
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
          var avatar = result.info.secure_url;
          // const userId = localStorage.getItem("userId");
          post(avatar,userId); // Call the post function with the image data and userId
        } else if (error) {
          console.error("Error uploading image:", error);
        }
      }
    );
  }

  async function post(avatar,userId) {
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

  useEffect(() => {
    auth(); // Call the auth function to get the userId
    UploadToWidget();
  }, []);

  return (
    <div>
      <h1>hi</h1>
      <button onClick={() => widgetRef.current.open()}>Upload</button>
    </div>
  );
};

export default Profile;
