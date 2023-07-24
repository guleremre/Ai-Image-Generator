import { useState, useEffect } from "react";
import axios from "axios";

const url = "http://127.0.0.1:7860/sdapi/v1/txt2img";

function Home() {
  // const [prompt, setPrompt] = useState();
  // const [negativePrompt, setNegativePrompt] = useState();
  // const [image, setImage] = useState();
  // const [loading, updateLoading] = useState();

  const makeRequest = async () => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "*/*",
    };
    const data = {
      prompt: "boy,animated, 8k, volumetric lightning",
      negative_prompt:
        "nude, sketches, (worst quality, bad quality, child, cropped:1.4) ((monochrome)), ((grayscale)), (bad-hands-5:1.0), (badhandv4:1.0), (easynegative:0.8), (bad-artist-anime:0.8), (bad-artist:0.8), (bad_prompt:0.8), (bad-picture-chill-75v:0.8), (bad_prompt_version2:0.8), (bad_quality:0.8)",
    };
    try {
      const response = await axios.post(url, data, { headers });
      console.log("Response:", response.data.images[0]);
      // Handle the response data here
    } catch (error) {
      console.error("Error:", error.message);
      // Handle errors here
    }
  };
  useEffect(() => {
    makeRequest();
  }, []);

  // const onSubmit = async () => {
  //   try {
  //     console.log("1");
  //     const response = await axios
  //       .post(url, { prompt, negativePrompt })
  //       .then((response) => {
  //         console.log(response.json());
  //         setImage(response.data);
  //         console.log(image);
  //         updateLoading(false);
  //         console.log(updateLoading);
  //       });

  //     console.log("response.data");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error Please try again.");
  //   }
  // };

  return (
    <form>
      {" "}
      <h1>hi</h1>
      {/* <img src="`data:image/jpeg;base64,${imageBase64}`" alt="" /> <br /> */}
      {/* <textarea
        type="text"
        placeholder="prompt"
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
        width={"350px"}
      />
      <br />
      <textarea
        type="text"
        placeholder="negative prompt"
        onChange={(e) => {
          setNegativePrompt(e.target.value);
        }}
      />
      <br />
      <button
        type="submit"
        onClick={(e) => {
          onSubmit();
        }}
      >
        Generate Img
      </button> */}
      <button
        type="submit"
        onClick={(e) => {
          makeRequest();
        }}
      >
        Generate Img
      </button>
    </form>
  );
}

export default Home;
