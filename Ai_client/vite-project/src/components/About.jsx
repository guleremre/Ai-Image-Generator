import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";

const StyledAboutBox = styled(Grid)({
  background: "#f5f5f5",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "16px",
  minHeight: "600px",
  "& h1": {
    fontSize: "28px",
    marginBottom: "12px",
  },
  "& b": {
    fontWeight: "bold",
  },
});

const About = () => {
  return (
    <StyledAboutBox container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6}>
        <h1>About AI-rtistic</h1>
        <Typography>
          In this application, you can create images by entering prompts.
          Text-to-Image with Stable Diffusion
        </Typography>
        <Typography>
          In this webpage Stable Diffusion used as image generator .Stable
          Diffusion is a latent text-to-image diffusion model.
        </Typography>
        <Typography>
          <b>Sampler:</b> Which algorithm to use to produce the image
        </Typography>
        <Typography>
          <b>Steps:</b> How many times to improve the generated image
          iteratively; higher values take longer; very low values can produce
          bad results
        </Typography>
        <Typography>
          <b>CFG scale schedule:</b> How closely the image should conform to the
          prompt. Lower values produce more creative results. (recommended range
          5-15)
        </Typography>
      </Grid>

      <Typography>
        <b>Negative prompt</b>Allows you to use another prompt of things the
        model should avoid when generating the picture. This works by using the
        negative prompt for unconditional conditioning in the sampling process
        instead of an empty string.
      </Typography>
      <Typography>
        <b>Promts in detail: </b>Emphasis Using ( ) in the prompt increases the
        model's attention to enclosed words, and [ ] decreases it. You can
        combine multiple modifiers: Cheat sheet: a (word) - increase attention
        to word by a factor of 1.1 <br />
        a ((word)) - increase attention to word by a factor of 1.21 (= 1.1 *
        1.1)
        <br />a [word] - decrease attention to word by a factor of 1.1
        <br />a (word:1.5) - increase attention to word by a factor of 1.5
        <br />a (word:0.25) - decrease attention to word by a factor of 4 (= 1 /
        0.25)
        <br />a (word\) - use literal () characters in prompt With ( ), a weight
        can be specified like this: (text:1.4). If the weight is not specified,
        it is assumed to be 1.1. Specifying weight only works with ( ) not with
        [ ].
        <br /> If you want to use any of the literal ( )[ ] characters in the prompt,
        use the backslash to escape them: anime_\(character\). On 2022-09-29, a
        new implementation was added that supports escape characters and
        numerical weights. A downside of the new implementation is that the old
        one was not perfect and sometimes ate characters: "a (((farm))),
        daytime", for example, would become "a farm daytime" without the comma.
        This behavior is not shared by the new implementation which preserves
        all text correctly, and this means that your saved seeds may produce
        different pictures. For now, there is an option in settings to use the
        old implementation. NAI uses my implementation from before 2022-09-29,
        except they have 1.05 as the multiplier and use { } instead of ( ). So the
        conversion applies:
        <pre>
          {`their {word} = our (word:1.05)
their {{word}} = our (word:1.1025)
their [word] = our (word:0.952) (0.952 = 1/1.05)
their [[word]] = our (word:0.907) (0.907 = 1/1.05/1.05)`}
        </pre>
      </Typography>
      <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Features#alt-diffusion">
        credits
      </a>
    </StyledAboutBox>
  );
};

export default About;
