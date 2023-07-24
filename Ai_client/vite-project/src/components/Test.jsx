import { useState } from "react";
import axios from "axios";

const url = "http://127.0.0.1:7860/sdapi/v1/txt2img";

const Test = () => {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [negative, setNegativePrompt] = useState();
  const [loading, updateLoading] = useState();

  const generate = async (prompt) => {
    updateLoading(true);
    const result = await axios.get(url);
    updateImage(result.data);
    updateLoading(false);
  };

  return (
    <form>
      {" "}
      <h1>hi</h1>
      {/* <img src="`data:image/jpeg;base64,${imageBase64}`" alt="" /> <br /> */}
      <input
        type="text"
        placeholder="prompt"
        onChange={(e) => {
          updatePrompt(e.target.value);
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
