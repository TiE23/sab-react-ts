import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { drawStroke, setCanvasSize, clearCanvas } from './canvasUtils';
import { ColorPanel } from './shared/ColorPanel';
import { EditPanel } from './shared/EditPanel';
import { useCanvas } from './CanvasContext';

import { currentStrokeSelector } from './modules/currentStroke/selector';
import { strokesSelector } from './modules/strokes/selector';
import { historyIndexSelector } from './modules/historyIndex/selector';
import { beginStroke, endStroke, updateStroke } from './actions';
import { FilePanel } from './shared/FilePanel';

const WIDTH = 1024
const HEIGHT = 768

function App() {
  const dispatch = useDispatch();
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useCanvas();
  const currentStroke = useSelector(currentStrokeSelector);
  const strokes = useSelector(strokesSelector);
  const historyIndex = useSelector(historyIndexSelector);
  const isDrawing = !!currentStroke.points.length;

  const getCanvasWithContext = useCallback((canvas = canvasRef.current) => {
    return { canvas, context: canvas?.getContext("2d") };
  }, [canvasRef]);

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const {offsetX, offsetY } = nativeEvent;
    dispatch(beginStroke({x: offsetX, y: offsetY}));
  };

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke({stroke: currentStroke, historyIndex}));
    }
  };

  const draw = ({
    nativeEvent
  }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return; // If the mouse isn't down we do nothing!
    }
    const { offsetX, offsetY } = nativeEvent;
    dispatch(updateStroke({x: offsetX, y: offsetY}));
  };

  // Every time the currentStroke is updated we animate (draw on) the canvas.
  useEffect(() => {
    const { context } = getCanvasWithContext();
    if (!context) {
      return;
    }

    requestAnimationFrame(() => drawStroke(
      context,
      currentStroke.points,
      currentStroke.color,
    ));
  }, [currentStroke, getCanvasWithContext]);

  // Every (?) redraw the canvas is re-created.
  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!canvas || !context) {
      return;
    }

    setCanvasSize(canvas, WIDTH, HEIGHT);

    context.lineJoin = "round";
    context.lineCap = "round";
    context.lineWidth = 5;
    context.strokeStyle = "black";

    clearCanvas(canvas);
  }, [getCanvasWithContext]);

  useEffect(() => {
    const { canvas, context } = getCanvasWithContext();
    if (!canvas || !context) {
      return;
    }
    requestAnimationFrame(() => {
      clearCanvas(canvas);

      strokes.slice(0, strokes.length - historyIndex).forEach((stroke) =>
        drawStroke(context, stroke.points, stroke.color)
      );
    })
  }, [getCanvasWithContext, historyIndex, strokes]);

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Redux Paint</div>
        <div className="title-bar-controls">
          <button aria-label="Close" />
        </div>
      </div>
      <EditPanel />
      <ColorPanel />
      <FilePanel />
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}

export default App;
