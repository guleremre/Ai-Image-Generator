import { useState, useEffect } from "react";
import axios from "axios";

const url = "http://127.0.0.1:7860/sdapi/v1/txt2img";

function Home() {
  const [prompt, setPrompt] = useState("");
  const [negative_prompt, setNegativePrompt] = useState("");
  const [img, setImg] = useState();
  const [loading, updateLoading] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    // const headers = {
    //   "Content-Type": "application/json",
    //   Accept: "*/*",
    // };
    try {
      const response = await axios.post(
        url,
        { prompt, negative_prompt }
        // { headers }
      );
      console.log("Response:", response.data.images[0]);
      console.log("Response:", response.data);
      console.log(prompt);
      console.log(negative_prompt);
      updateLoading(false);
      setImg(response.data.images[0]);
      // Handle the response data here
    } catch (error) {
      console.error("Error:", error.message);
      // Handle errors here
    }
  };

  const renderImg = `data:image/jpeg;base64,${img}`;

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <h1>Ai Image Generator</h1>

        <textarea
          type="text"
          defaultValue="1girl, 8k, ((best quality)), ((masterpiece)), ((realistic)), vintage Afro-Caribbean woman, elegant attire, 1950s fashion, radiant smile, confident stance, cultural pride, (oil painting:1.2),  vivid colors, nostalgic background, authentic vintage feel, (portrait composition:1.3), (high-resolution:1.2)"
          onChange={(e) => setPrompt(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="negative prompt"
          defaultValue="nude,3d, cartoon, anime, sketches, (worst quality, bad quality, child, cropped:1.4) ((monochrome)), ((grayscale)),  (bad-hands-5:1.0), (badhandv4:1.0), (easynegative:0.8),  (bad-artist-anime:0.8), (bad-artist:0.8), (bad_prompt:0.8), (bad-picture-chill-75v:0.8), (bad_prompt_version2:0.8),  (bad_quality:0.8)"
          onChange={(e) => {
            setNegativePrompt(e.target.value);
          }}
        />
        <br />
        <button>Generate Img</button>
        {/* <img src={renderImg} /> */}
      </form>
      <div>
        {loading ? <div>Loading...</div> : img ? <img src={renderImg} /> : null}
      </div>
    </>
  );
}

export default Home;
