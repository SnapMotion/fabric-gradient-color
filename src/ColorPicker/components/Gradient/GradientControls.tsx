// @ts-nocheck
import React, { useCallback, useState } from "react";

import { calculateDegree } from "../../helpers";
import { useMouseEvents } from "../../hooks";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { styles } from "../../styles";

function GradientControls({ type, degree, changeGradientControl }) {
  const [disableClick, setDisableClick] = useState(false);

  const onClickGradientDegree = useCallback(() => {
    if (disableClick) {
      setDisableClick(false);
      return;
    }

    let gradientDegree = degree + 45;

    if (gradientDegree >= 360) {
      gradientDegree = 0;
    }

    changeGradientControl({ degree: parseInt(gradientDegree, 10) });
  }, [disableClick, degree, changeGradientControl]);

  const mouseDownHandler = useCallback((event) => {
    const pointer = event.target;
    const pointerBox = pointer.getBoundingClientRect();
    const centerY = pointerBox.top + parseInt(8 - window.pageYOffset, 10);
    const centerX = pointerBox.left + parseInt(8 - window.pageXOffset, 10);

    return {
      centerY,
      centerX,
    };
  }, []);

  const mouseMoveHandler = useCallback(
    (event, { centerX, centerY }) => {
      setDisableClick(true);

      const newDegree = calculateDegree(
        event.clientX,
        event.clientY,
        centerX,
        centerY
      );

      changeGradientControl({ degree: parseInt(newDegree, 10) });

      return { centerX, centerY };
    },
    [changeGradientControl]
  );

  const mouseUpHandler = (event) => {
    const targetClasses = event.target.classList;

    if (
      targetClasses.contains("gradient-degrees") ||
      targetClasses.contains("icon-rotate")
    ) {
      return;
    }

    setDisableClick(false);
  };

  const mouseEvents = useMouseEvents(
    mouseDownHandler,
    mouseMoveHandler,
    mouseUpHandler
  );

  const onMouseDown = (event) => {
    mouseEvents(event);
  };

  const degreesStyle = {
    transform: `rotate(${degree}deg)`,
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <ButtonGroup size={"sm"} isAttached gap={1}>
        <Button
          onClick={() => changeGradientControl({ type: "linear" })}
          color={type === "linear" ? "white" : "gray.400"}
          background={"whiteAlpha.50"}
          fontWeight={600}
          fontSize="14px"
          size={"sm"}
        >
          Linear
        </Button>
        <Button
          onClick={() => changeGradientControl({ type: "radial" })}
          fontWeight={600}
          color={type === "radial" ? "white" : "gray.400"}
          background={"whiteAlpha.50"}
          fontSize="14px"
          size={"sm"}
        >
          Radial
        </Button>
      </ButtonGroup>

      {type === "linear" && (
        <Box
          border={"3px solid"}
          borderColor={"bg-subtle"}
          sx={styles.gradientDegrees}
          onMouseDown={onMouseDown}
          onClick={onClickGradientDegree}
        >
          <div style={{ ...degreesStyle, ...styles.gradientDegreeCenter }}>
            <div style={styles.gradientDegreePointer} />
          </div>
        </Box>
      )}
    </Box>
  );
}

export default GradientControls;
