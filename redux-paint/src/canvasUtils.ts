import { Point } from "./types";

export const drawStroke = (
  context: CanvasRenderingContext2D,
  points: Point[],
  color: string,
) => {
  if (!points.length) {
    return; // No point in drawing if empty!
  }
  // Interesting how we're modifying the argument directly...
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  points.forEach((point) => {
    context.lineTo(point.x, point.y);
    context.stroke();
  });
  context.closePath();
};

// Clears the canvas we set the fill color to white and draw the canvas rectangle.
export const clearCanvas = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
};

export const setCanvasSize = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
) => {
  canvas.width = width * 2;
  canvas.height = height * 2;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.getContext("2d")?.scale(2, 2);
};