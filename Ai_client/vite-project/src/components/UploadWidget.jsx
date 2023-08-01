import { useEffect, useRef } from "react";
import axios from "axios";

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  function wid() {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "djyfosrda",
        uploadPreset: "airtistic",
        cropping: true,
        // theme: "purple",
        folder: "ai_generator",
        multiple: false,
        // clientAllowedFormats: ["images"],
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          console.log(result);
          console.log("news", result.info.secure_url);
         
          var Base64Img = result.info.secure_url;
          console.log("21212", Base64Img);
          post(Base64Img); // Call the post function with the image data
        } else if (error) {
          console.error("Error uploading image:", error);
        }
      }
    );
  }

  async function post(Base64Img) {
    console.log("oldumu", Base64Img);
    const url = "http://localhost:4000/img/";
    console.log("oldumu2", Base64Img);
    try {
      const response = await axios.post(url, { Base64Img });
      console.log("Upload successful!", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
  useEffect(() => {
    wid();
  }, []);

  return (
    <div>
      <h1>hi</h1>
      <button onClick={() => widgetRef.current.open()}>Upload</button>
    </div>
  );
};

export default UploadWidget;
