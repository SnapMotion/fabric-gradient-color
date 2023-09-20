// @ts-nocheck
import React, { useEffect, useState, useRef, useCallback } from "react";

import {
  generateGradientStyle,
  updateGradientActivePercent,
} from "../../helpers";

import GradientPoint from "./GradientPoint";
import { styles } from "../../styles";

function GradientPoints({
  points,
  activePointIndex,
  changeActivePointIndex,
  updateGradientLeft,
  addPoint,
  removePoint,
}) {
  const [pointsStyle, setpointsStyle] = useState({});
  const [width, setWidth] = useState(0);
  const [positions, setPositions] = useState({});

  const pointsContainerRef = useRef();

  useEffect(() => {
    if (pointsContainerRef.current) {
      setWidth(pointsContainerRef.current.clientWidth);

      const pointerPos = pointsContainerRef.current.getBoundingClientRect();
      setPositions({ x: pointerPos.x, y: pointerPos.y });
    }
  }, []);
  useEffect(() => {
    const style = generateGradientStyle(points, "linear", 90);

    setpointsStyle({ background: style });
  }, [points]);

  const pointsContainerClick = useCallback(
    (event) => {
      const left = updateGradientActivePercent(
        event.pageX - positions.x,
        width
      );

      addPoint(left);
    },
    [addPoint, positions.x, width]
  );

  const pointsContainer = () => (
    <div style={styles.gradientSliderContainer} ref={pointsContainerRef}>
      {points &&
        points.map((point, index) => (
          <GradientPoint
            key={index}
            activePointIndex={activePointIndex}
            index={index}
            point={point}
            width={width}
            positions={positions}
            changeActivePointIndex={changeActivePointIndex}
            updateGradientLeft={updateGradientLeft}
            removePoint={removePoint}
          />
        ))}
    </div>
  );

  return (
    <div
      style={{ ...pointsStyle, ...styles.gradient }}
      onClick={pointsContainerClick}
    >
      {pointsContainer()}
    </div>
  );
}

export default GradientPoints;
