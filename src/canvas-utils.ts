import { type Rect, type Canvas, Point } from "fabric";
import { ZOOM_STEP } from "./constants";

export const getArboardCenterZoom = (canvas: Canvas, artboard: Rect) => {
  const widthRatio = (canvas.width / artboard.width) * 0.7;
  const heightRatio = (canvas.height / artboard.height) * 0.8;

  return Math.min(widthRatio, heightRatio);
};

export const centerArtboard = (canvas: Canvas, artboard: Rect) => {
  const zoom = getArboardCenterZoom(canvas, artboard);
  canvas.setZoom(zoom);

  const vpt = canvas.viewportTransform;
  vpt[4] = (canvas.width - artboard.width * zoom) / 2;
  vpt[5] = (canvas.height - artboard.height * zoom) / 2;

  canvas.requestRenderAll();
};

export const zoomIn = (canvas: Canvas) => {
  const currentZoom = parseFloat(canvas.getZoom().toFixed(2));
  const newZoom = currentZoom + ZOOM_STEP;
  canvas.zoomToPoint(new Point(canvas.width / 2, canvas.height / 2), newZoom);
};

export const zoomOut = (canvas: Canvas) => {
  const currentZoom = parseFloat(canvas.getZoom().toFixed(2));
  const newZoom = currentZoom - ZOOM_STEP;
  canvas.zoomToPoint(new Point(canvas.width / 2, canvas.height / 2), newZoom);
};
