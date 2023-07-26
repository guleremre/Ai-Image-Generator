import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Skeleton from "@mui/material/Skeleton";
import "@fontsource/public-sans";
import Textarea from "@mui/joy/Textarea";
import FormLabel from "@mui/joy/FormLabel";

const url = "http://127.0.0.1:7860/sdapi/v1/txt2img";

function Home() {
  const [prompt, setPrompt] = useState(
    "cute fluffy monster, (masterpiece, best quality, beautiful and aesthetic:1.2), ultra high res, 8k, detailed, (fractal art:1.3), colorful, radiosity, automatic white balance"
  );
  const [negative_prompt, setNegativePrompt] = useState(
    "nude, ng_deepnegative_v1_75t,easynegative,(worst quality:2), (low quality:2), (normal quality:1.8), lowres, ((monochrome)), ((grayscale)),sketch,ugly,morbid, deformed,logo,text, bad anatomy,bad proportions,disfigured,extra arms, extra legs, fused fingers,extra digits, fewer digits, mutated hands, poorly drawn hands,bad hands"
  );
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
        <Box
          sx={{
            bgcolor: "#9fa8a4",
            p: 8,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {imgLoad ? (
            <img sty src={renderImg} />
          ) : (
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              animation="wave"
              width={512}
              height={512}
            />
          )}
        </Box>
        {/* <textarea
          style={{ width: 600, minHeight: 90 }}
          type="text"
          placeholder="Enter prompt"
          defaultValue="cute fluffy monster,1girl, (masterpiece, best quality, beautiful and aesthetic:1.2), ultra high res, 8k, detailed, (fractal art:1.3), colorful, radiosity, automatic white balance
          "
          onChange={(e) => setPrompt(e.target.value)}
        /> */}
        <FormLabel>Prompt</FormLabel>
        <Textarea
          color="primary"
          minRows={3}
          size="md"
          sx={{
            "--Textarea-focusedInset": "var(--any, )",
            "--Textarea-focusedThickness": "0.25rem",
            "--Textarea-focusedHighlight": "rgba(13,110,253,.25)",
            "&::before": {
              transition: "box-shadow .15s ease-in-out",
            },
            "&:focus-within": {
              borderColor: "#86b7fe",
            },
          }}
          variant="solid"
          placeholder="Enter prompt"
          defaultValue="cute fluffy monster,1girl, (masterpiece, best quality, beautiful and aesthetic:1.2), ultra high res, 8k, detailed, (fractal art:1.3), colorful, radiosity, automatic white balance
          "
          onChange={(e) => setPrompt(e.target.value)}
        />
        <br />
        {/* <textarea
          style={{ width: 600, minHeight: 90 }}
          type="text"
          placeholder="Enter negative prompt"
          defaultValue="nude, ng_deepnegative_v1_75t,easynegative,(worst quality:2), (low quality:2), (normal quality:1.8), lowres, ((monochrome)), ((grayscale)),sketch,ugly,morbid, deformed,logo,text, bad anatomy,bad proportions,disfigured,extra arms, extra legs, fused fingers,extra digits, fewer digits, mutated hands, poorly drawn hands,bad hands"
          onChange={(e) => {
            setNegativePrompt(e.target.value);
          }}
        /> */}
        <FormLabel>Negative prompt</FormLabel>
        <Textarea
          color="primary"
          minRows={3}
          size="md"
          sx={{
            "--Textarea-focusedInset": "var(--any, )",
            "--Textarea-focusedThickness": "0.25rem",
            "--Textarea-focusedHighlight": "rgba(13,110,253,.25)",
            "&::before": {
              transition: "box-shadow .15s ease-in-out",
            },
            "&:focus-within": {
              borderColor: "#86b7fe",
            },
          }}
          variant="solid"
          placeholder="Enter Negative prompt"
          defaultValue="nude, ng_deepnegative_v1_75t,easynegative,(worst quality:2), (low quality:2), (normal quality:1.8), lowres, ((monochrome)), ((grayscale)),sketch,ugly,morbid, deformed,logo,text, bad anatomy,bad proportions,disfigured,extra arms, extra legs, fused fingers,extra digits, fewer digits, mutated hands, poorly drawn hands,bad hands"
          onChange={(e) => {
            setNegativePrompt(e.target.value);
          }}
        />
        <Box sx={{ "& > button": { m: 1 } }}>
          <LoadingButton
            size="medium"
            onClick={onSubmit}
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <span>Generate Image</span>
          </LoadingButton>
        </Box>
      </form>
    </>
  );
}

export default Home;
