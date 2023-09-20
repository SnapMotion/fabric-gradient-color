import { Box } from "@chakra-ui/react";
import Hex from "./Hex/Hex";
import RGB from "./RGB";

function Preview({ red, green, blue, alpha, updateRgb }) {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "2rem" }}>
      <Hex red={red} green={green} blue={blue} updateRgb={updateRgb} />
      <Box sx={{ display: "flex", gap: "0.25rem" }}>
        <RGB
          red={red}
          green={green}
          blue={blue}
          alpha={alpha}
          updateRgb={updateRgb}
        />
      </Box>
    </Box>
  );
}

export default Preview;
