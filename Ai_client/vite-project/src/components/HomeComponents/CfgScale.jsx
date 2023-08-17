import * as React from "react";
import PropTypes from "prop-types";
import { styled, alpha, Box } from "@mui/system";
import { sliderClasses } from "@mui/base/Slider";
import { Slider } from "@mui/base";

export default function CfgSlider({ onValueChange }) {
  const handleSliderChange = (newScale) => {
    onValueChange(newScale); // Update the state when slider value changes
  };
  return (
    <Box sx={{ width: 250 }}>
      <StyledSlider
        aria-label="Smilarity"
        defaultValue={5}
        // getAriaValueText={valuetext}
        onChange={handleSliderChange}
        step={0.5}
        marks
        min={0}
        max={20}
        slots={{ valueLabel: SliderValueLabel }}
      />
    </Box>
  );
}

function SliderValueLabel({ children }) {
  return (
    <span className="valueLabel">
      <div className="value">{children}</div>
    </span>
  );
}

SliderValueLabel.propTypes = {
  children: PropTypes.element.isRequired,
};

// function valuetext(value) {
//   return { value };
// }

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  300: "#66B2FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledSlider = styled(Slider)(
  ({ theme }) => `
  color: ${theme.palette.mode === "light" ? blue[500] : blue[400]};
  height: 6px;
  width: 100%;
  padding: 16px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    opacity: 2;
  }

  &.${sliderClasses.disabled} { 
    pointer-events: none;
    cursor: default;
    color: ${theme.palette.mode === "light" ? grey[300] : grey[600]};
    opacity: 0.5;
  }

  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: ${theme.palette.mode === "light" ? blue[200] : blue[900]};
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
  }

  & .${sliderClasses.thumb} {
    position: absolute;
    width: 16px;
    height: 16px;
    margin-left: -6px;
    margin-top: -6px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    border: 3px solid currentColor;
    background-color: #fff;
    display: flex;
    flex-direction: column-reverse;

    :hover,
    &.${sliderClasses.focusVisible} {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === "light" ? blue[400] : blue[300],
        0.15
      )};
    }

    &.${sliderClasses.active} {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === "light" ? blue[200] : blue[300],
        0.3
      )};
    }
  }

  & .${sliderClasses.mark} {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 99%;
    background-color: ${theme.palette.mode === "light" ? blue[200] : blue[900]};
    top: 43%;
    transform: translateX(-50%);
  }

  & .${sliderClasses.markActive} {
    background-color: ${theme.palette.mode === "light" ? blue[500] : blue[400]};
  }

  & .valueLabel {
    font-family: IBM Plex Sans;
    font-weight: 600;
    font-size: 24px;
    position: relative;
    top: -0.5em;
    text-align: center;
    align-self: center;
    
  }
  
`
);
