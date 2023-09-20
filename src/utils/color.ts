import * as fabric from "fabric";
import { FabricObjectProps } from "fabric";

interface RGBAPoint {
  red: number;
  green: number;
  blue: number;
  alpha: number;
  left: number;
}
interface CssGradient {
  type: "linear" | "radial";
  degree: number;
  style: string;
  points: RGBAPoint[];
}

interface GradientHandler {
  offset: number;
  color: string;
}
export const cssGradientToFabricGradient = (
  gradient: CssGradient,
  obj: Pick<FabricObjectProps, "width" | "height">
) => {
  const handlers: GradientHandler[] = gradient.points.map((point) => ({
    offset: point.left / 100,
    color: `rgba(${point.red}, ${point.green}, ${point.blue}, ${point.alpha})`,
  }));
  return generateFabricGradientFromColorStops({
    handlers,
    width: obj.width,
    height: obj.height,
    degree: gradient.degree,
    type: gradient.type,
  });
};

const generateFabricGradientFromColorStops = ({
  handlers,
  width,
  height,
  degree: angle,
  type: orientation,
}: {
  handlers: GradientHandler[];
  width: number;
  height: number;
  type: "linear" | "radial";
  degree: number;
}) => {
  const gradAngleToCoords = (paramsAngle) => {
    const anglePI = -parseInt(paramsAngle, 10) * (Math.PI / 180);
    return {
      x1: Math.round(50 + Math.sin(anglePI) * 50) / 100,
      y1: Math.round(50 + Math.cos(anglePI) * 50) / 100,
      x2: Math.round(50 + Math.sin(anglePI + Math.PI) * 50) / 100,
      y2: Math.round(50 + Math.cos(anglePI + Math.PI) * 50) / 100,
    };
  };

  const generateLinear = (colorStops) => {
    const angleCoords = gradAngleToCoords(angle);
    return new fabric.Gradient({
      type: "linear",
      coords: {
        x1: angleCoords.x1 * width,
        y1: angleCoords.y1 * height,
        x2: angleCoords.x2 * width,
        y2: angleCoords.y2 * height,
      },
      colorStops,
    });
  };

  const generateRadial = (colorStops) => {
    return new fabric.Gradient({
      type: "radial",
      coords: {
        x1: width / 2,
        y1: height / 2,
        r1: 0,
        x2: width / 2,
        y2: height / 2,
        r2: width / 2,
      },
      colorStops,
    });
  };

  let bgGradient = {};
  const colorStops = [...handlers];
  if (orientation === "linear") {
    bgGradient = generateLinear(colorStops);
  } else if (orientation === "radial") {
    bgGradient = generateRadial(colorStops);
  }

  return bgGradient;
};
