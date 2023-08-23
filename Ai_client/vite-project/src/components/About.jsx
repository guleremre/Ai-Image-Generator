import { Box } from "@mui/material";
import * as React from "react";
import Typography from "@mui/joy/Typography";
function About() {
  return (
    <Box sx={{ background: "#fff", borderRadius: "8px", my: "3px", p: "2px" }}>
      <h1>About</h1>
      <Typography>
        Stable Diffusion is a latent text-to-image diffusion model.
      </Typography>
      <Typography>
        In this application you can create images by entering prompts
        Text-to-Image with Stable Diffusion{" "}
      </Typography>
      <Typography>
        <b>Sampler:</b> Which algorithm to use to produce the image
      </Typography>
      <Typography>
        <b>Steps:</b>How many times to improve the generated image iteratively;
        higher values take longer; very low values can produce bad results
      </Typography>
      <Typography>
        <b>CFG scale schedule:</b> how closely the image should conform to the
        prompt. Lower values produce more creative results. (recommended range
        5-15)
      </Typography>
    </Box>
  );
}

export default About;
