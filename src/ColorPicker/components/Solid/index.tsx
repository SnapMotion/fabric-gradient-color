// @ts-nocheck
import React, { useCallback, useState } from "react";

import { useMount } from "../../hooks";
import { rgbToHsv, getRightValue, generateSolidStyle } from "../../helpers";

import Area from "../Area";
import Preview from "../Preview";
import Picking from "../Area/Picker";
import Hue from "../Area/Hue";
import Alpha from "../Area/Alpha";
import { Box } from "@chakra-ui/react";

function Solid({
  red,
  green,
  blue,
  alpha,
  onChange,
  onStartChange,
  onEndChange,
}) {
  const [colorRed, setColorRed] = useState(red);
  const [colorGreen, setColorGreen] = useState(green);
  const [colorBlue, setColorBlue] = useState(blue);
  const [colorAlpha, setColorAlpha] = useState(alpha);
  const [colorHue, setColorHue] = useState(0);
  const [colorSaturation, setColorSaturation] = useState(100);
  const [colorValue, setColorValue] = useState(100);

  const actions = {
    onChange,
    onStartChange,
    onEndChange,
  };

  useMount(() => {
    const { hue, saturation, value } = rgbToHsv({
      red: colorRed,
      green: colorGreen,
      blue: colorBlue,
    });

    setColorHue(hue);
    setColorSaturation(saturation);
    setColorValue(value);
  });

  const updateColor = useCallback(
    (
      { red, green, blue, alpha, hue, saturation, value },
      actionName = "onChange"
    ) => {
      red = getRightValue(red, colorRed);
      green = getRightValue(green, colorGreen);
      blue = getRightValue(blue, colorBlue);
      alpha = getRightValue(alpha, colorAlpha);
      hue = getRightValue(hue, colorHue);
      saturation = getRightValue(saturation, colorSaturation);
      value = getRightValue(value, colorValue);

      setColorRed(red);
      setColorGreen(green);
      setColorBlue(blue);
      setColorAlpha(alpha);
      setColorHue(hue);
      setColorSaturation(saturation);
      setColorValue(value);

      const action = actions[actionName];

      action &&
        action({
          red,
          green,
          blue,
          alpha,
          hue,
          saturation,
          value,
          style: generateSolidStyle(red, green, blue, alpha),
        });
    },
    [
      colorRed,
      colorGreen,
      colorBlue,
      colorAlpha,
      colorHue,
      colorSaturation,
      colorValue,
      actions,
    ]
  );

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <Picking
        red={colorRed}
        green={colorGreen}
        blue={colorBlue}
        hue={colorHue}
        saturation={colorSaturation}
        value={colorValue}
        updateRgb={updateColor}
      />

      <Hue
        hue={colorHue}
        saturation={colorSaturation}
        value={colorValue}
        updateRgb={updateColor}
      />
      <Alpha
        alpha={colorAlpha}
        red={colorRed}
        green={colorGreen}
        blue={colorBlue}
        updateRgb={updateColor}
      />
      <Preview
        red={colorRed}
        green={colorGreen}
        blue={colorBlue}
        alpha={colorAlpha}
        updateRgb={updateColor}
      />
    </Box>
  );
}

Solid.defaultProps = {
  red: 255,
  green: 0,
  blue: 0,
  alpha: 1,
};

export default Solid;
