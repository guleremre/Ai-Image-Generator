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
import BasicSelect from "./HomeComponents/BasicSelect";
import SamplingSteps from "./HomeComponents/SamplingSteps";

const url = "http://127.0.0.1:7860/sdapi/v1/txt2img";

function Home() {
  let [prompt, setPrompt] = useState(
    "monster 1girl, (masterpiece, best quality, beautiful and aesthetic:1.2), ultra high res, 8k, detailed, (fractal art:1.3), colorful, radiosity, automatic white balance"
  );
  let [negative_prompt, setNegativePrompt] = useState(
    "nude, topless, naked, ng_deepnegative_v1_75t, easynegative, (worst quality:2), (low quality:2), (normal quality:1.8), lowres, ((monochrome)), ((grayscale)), sketch, ugly, morbid, deformed, logo, text, bad anatomy, bad proportions, disfigured, extra arms, extra legs, fused fingers, extra digits, fewer digits, mutated hands, poorly drawn hands, bad hands"
  );
  const [double, setDouble] = useState(false);

  const doubleSize = () => {
    setDouble((prevValue) => !prevValue);
  };
  const [img, setImg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imgLoad, setImgLoad] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sampler_index = "DPM++ 2S a";
      const body1 = { prompt, negative_prompt, sampler_index, steps };
      console.log(sampler_index);
      const response = await axios.post(url, body1);
      console.log(response);
      console.log(response.data.info.sampler_name);
      console.log(response.data.info);
      setLoading(false);
      setImg(response.data.images[0]);
      setImgLoad(true);
      setDownloadReady(true);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const [downloadReady, setDownloadReady] = useState(false);

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

  // const handleAddFavorite = async (id) => {
  //   try {
  //     const response = await axios.post(`http://localhost:5000/user/${id}`, {
  //       token: token,
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [sampler_index, setSampler_index] = useState("");
  console.log("home sampler_index is", sampler_index);

  // const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (input) => {
    setSampler_index(input);
    console.log("home sampler_index is2", sampler_index);
    // setSampler_index((prevSampler_index) => [
    //   ...prevSampler_index,
    //   sampler_index,
    // ]);
  };

  const [steps, setSteps] = useState(20);

  const handleSliderValueChange = (newSteps) => {
    console.log("stepshome",steps);
    console.log("newsteps home",newSteps);
    setSteps(newSteps.target.value); // Update the state with the selected slider value
  };

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
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
              width={265}
              height={265}
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
            <LoadingButton
              variant="contained"
              size="medium"
              onClick={handleDownload}
              sx={{ margin: "auto" }}
            >
              Download Image
            </LoadingButton>
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
          <Box className="advancedSetups" sx={{ margin: 2 }}>
            <BasicSelect onSelected={handleSelectChange} />
            <SamplingSteps
              onValueChange={handleSliderValueChange}
              steps={steps}
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
