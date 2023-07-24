import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "http://127.0.0.1:7860/sdapi/v1/txt2img";

function Home() {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  // const [imageBase64, setImageBase64] = useState("");

  async function onSubmit() {
    try {
      await axios
        .post(
          url,
          { prompt, negativePrompt },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            }
          }
        )
        .then((response)=>{
          console.log("response.json")
        });
      console.log("response");
      const imageData = response.data.images[0];
      setImageBase64(imageData);
      console.log(response.json);
    } catch (error) {
      console.error();
      alert("Error Please try again.");
    }
  }

  return (
    <form>
      {" "}
      <h1>hi</h1>
      {/* <img src="`data:image/jpeg;base64,${imageBase64}`" alt="" /> <br /> */}
      <input
        type="text"
        placeholder="prompt"
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="negative prompt"
        onChange={(e) => {
          setNegativePrompt(e.target.value);
        }}
      />
      <br />
      <button
        type="submit"
        onClick={() => {
          onSubmit();
        }}
      >
        {" "}
        Generate Img
      </button>
    </form>
  );
}

export default Home;
