// We'll need to pass the reference to the canvas to this function.
// To make the canvas available from the FilePanel, let's move it to the context provider.
// This is a good and simple example of writing a context provider just for when you need one!
import React, {
  createContext,
  PropsWithChildren,
  useRef,
  RefObject,
  useContext,
} from "react";

export const CanvasContext = createContext<
  RefObject<HTMLCanvasElement>
>({} as RefObject<HTMLCanvasElement>);

export const CanvasProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <CanvasContext.Provider value={canvasRef}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
