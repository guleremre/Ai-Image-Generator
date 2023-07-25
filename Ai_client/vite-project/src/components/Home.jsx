import { useState, useEffect } from "react";
import axios from "axios";

const url = "http://127.0.0.1:7860/sdapi/v1/txt2img";

function Home() {
  const [prompt, setPrompt] = useState();
  const [negative_prompt, setNegativePrompt] = useState();
  const [img, setImg] = useState([]);
  const [loading, updateLoading] = useState();

  const onSubmit = async () => {
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
     // updateLoading(false);
      const base64 = response.data;
      setImg(base64);
      console.log(img);
      // Handle the response data here
    } catch (error) {
      console.error("Error:", error.message);
      // Handle errors here
    }
  };
  useEffect(() => {
    onSubmit();
  }, []);

  // const onSubmit = async () => {
  //   try {
  //     console.log("1");
  //     const response = await axios
  //       .post(url, { prompt, negativePrompt })
  //       .then((response) => {
  //         console.log(response.json());
  //         setImg(response.data);
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
    <>
      <form>
        {" "}
        <h1>Ai Image Generator</h1>
        <textarea
          type="text"
          placeholder="prompt"
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
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
        </button>
      </form>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : img ? (
          <img src={`data:image/png;base64,${img}`} />
        ) : null}
      </div>
    </>
  );
}

export default Home;
