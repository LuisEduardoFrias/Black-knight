/**/
/**/
import { Point } from './object.ts';
declare var requestAnimationFrame: (callback: (timestamp: number) => void) => number;
type drawing = (canvas: Canvas, timestamp: number) => void;
type collisions = (canvas: Canvas) => void;

export class Canvas {
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  center: Point;

  constructor() {
    const canvas = document.createElement('canvas');
    canvas.id = 'Canvas';

    // Estilos para que cubra la pantalla
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.transformOrigin = 'center';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.backgroundColor = 'transparent';
    /*
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    */
    // Objeto con coordenadas centrales
    this.center = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };

    const div = document.querySelector<HTMLDivElement>('#app');
    /*
    div!.style.width = '100dvw';
    div!.style.height = '100dvh';
    div!.style.perspective = '1000px';
    div!.style.perspectiveOrigin = 'center';
    div!.style.transformStyle = 'preserve-3d';
    */

    this.element = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  backgroud(url_: string) {
    this.element.style.backgroundImage = `url(${url_})`;
    this.element.style.backgroundRepeat = 'repeat';
  }

  public text(text: string, point: Point, color?: string, font?: string) {
    this.ctx.fillStyle = color ?? '#ffffff';
    this.ctx.font = font ?? '16px Arial';
    this.ctx.fillText(text, point.x, point.y);
  }

  public keyDownHandler(callback: (keyboard: string) => void) {
    this.element.addEventListener('keydown', (event) => {
      const { key } = event;
      callback(key);
    });
  }

  public keyaUpHandler(callback: (keyboard: string) => void) {
    this.element.addEventListener('keyup', (event) => {
      const { key } = event;
      callback(key);
    });
  }

  public keyPressHandler(callback: (keyboard: string) => void) {
    this.element.addEventListener('keypress', (event) => {
      const { key } = event;
      callback(key);
    });
  }

  public touchstart(handleStart: (event: TouchEvent) => void) {
    window.addEventListener("touchstart", (event) => {
      event.preventDefault();
      handleStart(event, this);
    }, false);
  }

  public touchend(handleEnd: (event: TouchEvent) => void) {
    window.addEventListener("touchend", (event) => {
      event.preventDefault();
      handleEnd(event, this.canvas);
    }, false);
  }

  public touchcancel(handleCancel: (event: TouchEvent) => void) {
    window.addEventListener("touchcancel", (event) => {
      event.preventDefault();
      handleCancel(event, this.canvas);
    }, false);
  }

  public touchleave(handleLeave: (event: TouchEventInit) => void) {
    window.addEventListener("touchleave", (event) => {
      event.preventDefault();
      handleLeave(event, this.canvas);
    }, false);
  }

  public touchmove(handleMove: (event: TouchEvent) => void) {
    window.addEventListener("touchmove", (event) => {
      event.preventDefault();
      handleMove(event, this.canvas);
    }, false);
  }
}

export const getCanvas = (drawing: drawing, collisions: collisions) => {
  const canvas = new Canvas();

  window.requestAnimationFrame((time: number) =>
    draw(canvas, drawing, collisions, time));

  return canvas.element;
};

function draw(canvas: Canvas, drawing: drawing, collisions: collisions, timestamp: number) {

  if (canvas.ctx) {
    canvas.ctx.clearRect(0, 0, canvas.element.width, canvas.element.height);
  }

  drawing(canvas, timestamp);
  collisions(canvas);

  window.requestAnimationFrame((time: number) => draw(canvas, drawing, collisions, time));
}
