/**/
declare var requestAnimationFrame: (callback: (timestamp: number) => void) => number;
type drawing = (timestamp: number) => void;
type collisions = () => void;

const canvas = document.createElement('canvas');
canvas.id = 'canvas';

export const canvasD2 = (drawing: drawing, collisions: collisions) => {
  const ctx = canvas.getContext('2d');

  requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  window.requestAnimationFrame = requestAnimationFrame;

  window.requestAnimationFrame((time: number) => draw(drawing, collisions, time));
  return { ctx, canvas };
};

const draw = (drawing: drawing, collisions: collisions, timestamp: number) => {
  drawing(timestamp);
  collisions();

  window.requestAnimationFrame((time: number) => draw(drawing, collisions, time));
}
