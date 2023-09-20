import React from "react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { ColorPicker } from "./ColorPicker";
import * as fabric from "fabric";
import { centerArtboard } from "./canvas-utils";
import { cssGradientToFabricGradient } from "./utils/color";
import tinyColor from "tinycolor2";

function App() {
  const [isGradient, setIsGradient] = React.useState(true);
  const canvasRef = React.useRef<fabric.Canvas>();

  React.useEffect(() => {
    const { clientWidth, clientHeight } = document.getElementById(
      "sm-canvas"
    ) as HTMLDivElement;

    const canvas = new fabric.Canvas("canvas", {
      height: clientHeight,
      width: clientWidth,
      backgroundColor: "#171923",
      preserveObjectStacking: true,
      selectionColor: "#18A0FB1A",
      selectionBorderColor: "#18A0FB",
      selectionLineWidth: 1,
    });

    const artboard = new fabric.Rect({
      left: 0,
      top: 0,
      fill: "#ffffff",
      width: 1200,
      height: 1200,
      evented: false,
      selectable: false,
    });

    canvas.add(artboard);

    centerArtboard(canvas, artboard);

    canvasRef.current = canvas;

    return () => {
      canvas.dispose();
    };
  }, []);

  const onChange = (attrs) => {
    updateArtboardColor({ color: attrs });
  };
  const setSolid = () => {
    setIsGradient(false);
  };
  const setGradient = () => {
    setIsGradient(true);
  };

  const updateArtboardColor = (payload) => {
    const canvas = canvasRef.current;
    const objects = canvas.getObjects();

    const artboard = objects[0];
    const { width, height } = artboard;
    if (payload.color.type) {
      const gradient = cssGradientToFabricGradient(payload.color, {
        width,
        height,
      });
      artboard.set({
        fill: gradient,
        gradientAngle: payload.color.degree,
      });
    } else {
      const color = tinyColor({
        r: payload.color.red,
        g: payload.color.green,
        b: payload.color.blue,
        a: payload.color.alpha,
      }).toRgbString();
      artboard.set({
        fill: color,
      });
    }
    canvas.requestRenderAll();
  };

  return (
    <Box height={"100vh"} bg={"bg-canvas"} display={"flex"}>
      <Box
        w={"320px"}
        bg={"bg-surface"}
        p={4}
        display={"flex"}
        flexDir={"column"}
        gap={4}
      >
        <ButtonGroup isAttached>
          <Button
            onClick={setSolid}
            bgColor={!isGradient ? "#2B64EB" : ""}
            fontSize="14px"
            fontWeight={600}
            color="white"
            size={"sm"}
          >
            Solid
          </Button>
          <Button
            onClick={setGradient}
            bgColor={isGradient ? "#2B64EB" : ""}
            fontSize="14px"
            fontWeight={600}
            color="white"
            size={"sm"}
          >
            Gradient
          </Button>
        </ButtonGroup>
        <Box>
          {isGradient ? (
            <ColorPicker
              onStartChange={(color) => onChange(color)}
              onChange={(color) => onChange(color)}
              onEndChange={(color) => onChange(color)}
              isGradient={isGradient}
            />
          ) : (
            <ColorPicker
              onStartChange={(color) => onChange(color)}
              onChange={(color) => onChange(color)}
              onEndChange={(color) => onChange(color)}
            />
          )}
        </Box>
      </Box>
      <Box id="sm-canvas" flex={1} bg={"bg-canvas"}>
        <canvas id="canvas" />
      </Box>
    </Box>
  );
}

export default App;
