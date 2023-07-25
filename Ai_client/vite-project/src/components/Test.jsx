import { useState } from "react";
import axios from "axios";

const url = "http://127.0.0.1:7860/sdapi/v1/txt2img";

const Test = () => {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [negative, setNegativePrompt] = useState();
  const [loading, updateLoading] = useState();

  const generate = async (prompt) => {
   
    const result = await axios.get(url,);
    updateImage(result.data);
    updateLoading(false);
  };

  return (
    <form>
      {" "}
      <h1>test</h1>
      {/* <img src="`data:image/jpeg;base64,${imageBase64}`" alt="" /> <br /> */}
      <input
        type="text"
        placeholder="((best quality)), ((masterpiece)), ((realistic)), vintage Afro-Caribbean woman, elegant attire, 1950s fashion, radiant smile, confident stance, cultural pride, (oil painting:1.2),  vivid colors, nostalgic background, authentic vintage feel, (portrait composition:1.3), (high-resolution:1.2)"
        onChange={(e) => {
          updatePrompt(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder=
        "nude,3d, cartoon, anime, sketches, (worst quality, bad quality, child, cropped:1.4) ((monochrome)), ((grayscale)),  (bad-hands-5:1.0), (badhandv4:1.0), (easynegative:0.8),  (bad-artist-anime:0.8), (bad-artist:0.8), (bad_prompt:0.8), (bad-picture-chill-75v:0.8), (bad_prompt_version2:0.8),  (bad_quality:0.8)"
        onChange={(e) => {
          setNegativePrompt(e.target.value);
        }}
      />
      <br />
      <button
        type="submit"
        onClick={() => {
          generate();
        }}
      >
        {" "}
        Generate Img
      </button>
      
    </form>
  );
};

export default Test;
