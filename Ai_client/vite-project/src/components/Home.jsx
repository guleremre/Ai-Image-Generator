import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/joy/Button";
import SendIcon from "@mui/icons-material/Send";
import Skeleton from "@mui/material/Skeleton";
import Textarea from "@mui/joy/Textarea";
import FormLabel from "@mui/joy/FormLabel";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import SamplingMethodSelect from "./HomeComponents/SamplingMethodSelect";
import SamplingSteps from "./HomeComponents/SamplingSteps";
import CfgSlider from "./HomeComponents/CfgScale";

const url = "http://127.0.0.1:7860/sdapi/v1/txt2img";

function Home() {
  let [prompt, setPrompt] = useState(
    "monster 1girl, (masterpiece, best quality, beautiful and aesthetic:1.2), ultra high res, 8k, detailed, (fractal art:1.3), colorful, radiosity, automatic white balance"
  );
  let [negative_prompt, setNegativePrompt] = useState(
    "nude, topless, naked, ng_deepnegative_v1_75t, easynegative, (worst quality:2), (low quality:2), (normal quality:1.8), lowres, ((monochrome)), ((grayscale)), sketch, ugly, morbid, deformed, logo, text, bad anatomy, bad proportions, disfigured, extra arms, extra legs, fused fingers, extra digits, fewer digits, mutated hands, poorly drawn hands, bad hands"
  );
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgLoad, setImgLoad] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [userId, setUserId] = useState("");
  const [downloadReady, setDownloadReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [sampler_index, setSamplerIndex] = useState("Euler");
  const [steps, setSteps] = useState(20);
  const [cfg_scale, setCfgScale] = useState(5);
  const [favedImgId, setFavedImgId] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body1 = {
        prompt,
        negative_prompt,
        sampler_index,
        steps,
        cfg_scale,
      };
      const response = await axios.post(url, body1);
      setLoading(false);
      setImg(response.data.images[0]);
      setImgLoad(true);
      setDownloadReady(true);
      auth();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Create a download link for the image
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = renderImg;
    link.download = "generated_image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //rendering image from base64 format
  const renderImg = `data:image/jpeg;base64,${img}`;

  //Get user ID
  async function auth() {
    const url = "http://localhost:4000/user/verify";
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(url, { token });
      setUserInfo((prevUserInfo) => ({ ...prevUserInfo, ...response.data }));
      setUserId(response.data._id);
      // console.log("user id geldimi", response.data._id, userId);
      // console.log("renderimg in auth", renderImg);
    } catch (error) {
      console.error("Error verifying token:", error);
    }
  }
  const createupload = async () => {
    const body2 = {
      prompt: prompt,
      negative_prompt: negative_prompt,
      sampler_index: sampler_index,
      steps: steps,
      cfg_scale: cfg_scale,
      image: renderImg,
      userId: userId,
    };
    try {
      const response = await axios.post("http://localhost:4000/img/", {
        body2,
      });
      var savedImgData = response.data.savedImg;
      setFavedImgId(response.data.savedImg._id); //set img id of favorite
      handleAddFavorite(savedImgData);
      alert(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };
  //after upload image info to database add to favorite
  const handleAddFavorite = async (savedImgData) => {
    console.log("home saved image data", savedImgData);
    try {
      const response = await axios.post(
        `http://localhost:4000/user/${userId}`,
        {
          savedImgData,
          userId: userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // which algoritm to choose
  //choose created image detail level
  const handleSliderValueChange = (newSteps) => {
    console.log("step value is", newSteps.target.value);
    setSteps(newSteps.target.value); // Update the state with the selected slider value
  };
  // choose image freedom level from input  cfg_scale;
  const handleCfgValueChange = (newScale) => {
    const cfg = newScale.target.value;
    setCfgScale(cfg);
    console.log("smilarity to prompt is setted to value", cfg);
  };
  useEffect(() => {
    onSubmit();
  }, []);
  return (
    <>
      <form onSubmit={onSubmit} className="background-image">
        <Box
          sx={{
            bgcolor: "#9fa8a4",
            p: 0,
            pt: 3,
            pb: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {imgLoad ? (
            <img
              width="256"
              className={"size"}
              onClick={handleClickOpen}
              src={renderImg}
            />
          ) : (
            <Skeleton
              sx={{ bgcolor: "grey.800" }}
              variant="rectangular"
              animation="wave"
              width={258}
              height={258}
            />
          )}
        </Box>
        <Box
          sx={{
            "& > button": { mt: 3 },
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <LoadingButton
            size="medium"
            onClick={onSubmit}
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            sx={{ margin: "auto" }}
          >
            <span>Generate Image</span>
          </LoadingButton>{" "}
          {downloadReady && (
            <>
              <LoadingButton
                variant="contained"
                size="medium"
                onClick={handleDownload}
                sx={{ margin: "auto" }}
              >
                Download Image
              </LoadingButton>

              <LoadingButton
                variant="contained"
                size="medium"
                onClick={createupload}
                sx={{ margin: "auto" }}
              >
                fav Image
              </LoadingButton>
            </>
          )}
        </Box>
        <Box
          sx={{
            p: 8,
            pt: 2,
            pb: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
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
            defaultValue="monster 1girl, (masterpiece, best quality, beautiful and aesthetic:1.2), ultra high res, 8k, detailed, (fractal art:1.3), colorful, radiosity, automatic white balance"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <br />

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
            defaultValue="nude, topless, naked, ng_deepnegative_v1_75t, easynegative, (worst quality:2), (low quality:2), (normal quality:1.8), lowres, ((monochrome)), ((grayscale)), sketch, ugly, morbid, deformed, logo, text, bad anatomy, bad proportions, disfigured, extra arms, extra legs, fused fingers, extra digits, fewer digits, mutated hands, poorly drawn hands, bad hands"
            onChange={(e) => {
              setNegativePrompt(e.target.value);
            }}
          />
          <Box
            className="advancedSetups"
            // sx={{ margin: 2, display: "flex", flexDirection: "column" }}
          >
            <SamplingMethodSelect
              onSelected={setSamplerIndex}
              sampler_index={sampler_index}
            />
            <Box
            // sx={{
            //   display: "flex",
            //   flexDirection: "column",
            //   justifyContent: "left",
            //   alignItems: "center",
            // }}
            >
              <SamplingSteps
                onValueChange={handleSliderValueChange}
                steps={steps}
              />
              <p>Detail value {steps}</p>
            </Box>
            <CfgSlider
              onValueChange={handleCfgValueChange}
              cfg_scale={cfg_scale}
            />
          </Box>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
              }}
            >
              <img
                style={{
                  width: "100%", // Set the initial width to 100%
                  maxWidth: "200%", // Ensure the image doesn't exceed its natural size
                  // height: "auto", // Maintain aspect ratio
                  transition: "width 0.2s ease",
                  marginBottom: 20,
                  transform: "scale(1)",
                }}
                src={renderImg}
                alt="renderImg"
                onClick={handleClose}
              />
              <Button
                sx={{ mt: 2, m: "auto" }}
                variant="outlined"
                onClick={handleClose}
              >
                Close
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </form>
    </>
  );
}

export default Home;
