// .d.ts files are used exclusively for type declarations.
export type RootState = {
  currentStroke: Stroke,
  strokes: Stroke[],
  historyIndex: number,
};

export type Stroke = {
  points: Point[],
  color: string,
};

export type Point = {
  x: number,
  y: number,
};
