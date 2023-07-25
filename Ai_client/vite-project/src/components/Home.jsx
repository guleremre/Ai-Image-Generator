import { useState, useEffect } from "react";
import axios from "axios";

const url = "http://127.0.0.1:7860/sdapi/v1/txt2img";

function Home() {
  const [prompt, setPrompt] = useState("");
  const [negative_prompt, setNegativePrompt] = useState("");
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgLoad, setImgLoad] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(url, { prompt, negative_prompt });
      console.log("Response:", response.data.images[0]);
      console.log("Response:", response.data);
      console.log(prompt);
      console.log(negative_prompt);
      setLoading(false);
      setImg(response.data.images[0]);
      setImgLoad(true);
      // Handle the response data here
    } catch (error) {
      console.error("Error:", error.message);
      // Handle errors here
    }
  };
  //rendering image from base64 format
  const renderImg = `data:image/jpeg;base64,${img}`;

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <h1>Ai Image Generator</h1>

        <textarea
          style={{ width: 800, minHeight: 100 }}
          type="text"
          placeholder="Enter prompt"
          defaultValue="cute fluffy monster"
          // defaultValue="1girl, (masterpiece, best quality, beautiful and aesthetic:1.2), ultra high res, 8k, detailed, (fractal art:1.3), colorful, radiosity, automatic white balance
          // "
          onChange={(e) => setPrompt(e.target.value)}
        />
        <br />
        <textarea
          style={{ width: 800, minHeight: 100 }}
          type="text"
          placeholder="Enter negative prompt"
          defaultValue="nude, ng_deepnegative_v1_75t,easynegative,(worst quality:2), (low quality:2), (normal quality:1.8), lowres, ((monochrome)), ((grayscale)),sketch,ugly,morbid, deformed,logo,text, bad anatomy,bad proportions,disfigured,extra arms, extra legs, fused fingers,extra digits, fewer digits, mutated hands, poorly drawn hands,bad hands"
          onChange={(e) => {
            setNegativePrompt(e.target.value);
          }}
        />
        <br />
        <button disabled={loading}>Generate Img</button>
        {/* <img src={renderImg} /> */}
      </form>
      <div>
        {loading ? <div>Loading...</div> : null}
        {imgLoad ? <img src={renderImg} /> : null}
        {/* {loading ? <div>Loading...</div> : img ? <img src={renderImg} /> : null} */}
      </div>
    </>
  );
}

export default Home;
