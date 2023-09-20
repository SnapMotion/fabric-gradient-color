import React, { useState, useEffect, useCallback } from "react";

import { rgbToHex, hexToRgb } from "../../../helpers";
import { Box, Input } from "@chakra-ui/react";

function Hex({ red, green, blue, updateRgb }) {
  const [hexValue, setHexValue] = useState("");
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    if (progress) {
      return;
    }
    const hex = rgbToHex(red, green, blue);

    setHexValue(hex);
  }, [red, green, blue, progress]);

  const changeHex = useCallback(
    (event) => {
      setHexValue(event.target.value);
      const color = hexToRgb(event.target.value);

      if (color) {
        updateRgb(color);
      }
    },
    [setHexValue, updateRgb]
  );

  return (
    <Box>
      <Input
        size={"sm"}
        value={hexValue}
        onChange={changeHex}
        onFocus={() => setProgress(true)}
        onBlur={() => setProgress(false)}
        textAlign={"center"}
      />
      <Box fontSize={"sm"} color={"gray.400"} textAlign={"center"} pt={1}>
        HEX
      </Box>
    </Box>
  );
}

export default Hex;
