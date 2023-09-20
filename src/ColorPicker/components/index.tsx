// @ts-nocheck
import React from "react";

import Solid from "./Solid";
import Gradient from "./Gradient";
import { Box } from "@chakra-ui/react";

function ColorPicker({
  color,
  isGradient,
  gradient,
  onStartChange,
  onChange,
  onEndChange,
}) {
  return (
    <Box userSelect={"none"}>
      {isGradient ? (
        <Gradient
          points={gradient.points}
          updateColor={onChange}
          type={gradient.type}
          degree={gradient.degree}
          onChange={onChange}
          onStartChange={onStartChange}
          onEndChange={onEndChange}
        />
      ) : (
        <Solid
          red={color.red}
          green={color.green}
          blue={color.blue}
          alpha={color.alpha}
          onChange={onChange}
          onStartChange={onStartChange}
          onEndChange={onEndChange}
        />
      )}
    </Box>
  );
}

ColorPicker.defaultProps = {
  isGradient: false,
  onChange: () => {},
  color: {
    red: 255,
    green: 0,
    blue: 0,
    alpha: 1,
  },
  gradient: {
    points: [
      {
        left: 0,
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1,
      },
      {
        left: 100,
        red: 255,
        green: 0,
        blue: 0,
        alpha: 1,
      },
    ],
    degree: 0,
    type: "linear",
  },
};

export default ColorPicker;
