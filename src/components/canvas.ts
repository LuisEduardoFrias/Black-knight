/**/
import { Point } from './object.js';

type drawing = (canvas: Canvas, timestamp: number) => void;
type collisions = (canvas: Canvas) => void;

export class Canvas {
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  center: Point;

  constructor(id?: string) {
    this.element = this.createCanvas(id);
    this.ctx = this.element.getContext('2d') as CanvasRenderingContext2D;
    this.center = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
  }

  private createCanvas(id?: string): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.className = 'Canvas';

    if (id) canvas.id = id;

    // Estilos para que cubra la pantalla
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.transformOrigin = 'center';
    //canvas.style.width = '100%';
    //canvas.style.height = '100%';
    canvas.style.backgroundColor = 'transparent';

    const div = document.querySelector<HTMLDivElement>('#app');
    div.style.width = '100vw';
    div.style.height = '100vh';

    return canvas;
  }

  public backgroud(url_: string) {
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

  private isMobile(): boolean {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  }

  /*
   public touchstart(handleStart: (event: TouchEvent, canvas: Canvas) => void) {
     this.element.addEventListener("touchstart", (event) => {
       event.preventDefault();
       handleStart(event, this);
     });
   }
 */

  public touchstart(handleStart: (event: TouchEvent) => void) {
    function eventTouch(event) {
      event.preventDefault();
      handleStart(event);
    };
   // this.element.removeEventListener('touchstart', eventTouch,true);
    this.element.addEventListener("touchstart", eventTouch,true);
  }

  public touchend(handleEnd: (event: TouchEvent, canvas: Canvas) => void) {
    this.element.addEventListener("touchend", (event) => {
      event.preventDefault();
      handleEnd(event, this);
    });
  }

  public touchcancel(handleCancel: (event: TouchEvent, canvas: Canvas) => void) {
    this.element.addEventListener("touchcancel", (event) => {
      event.preventDefault();
      handleCancel(event, this);
    });
  }

  public touchleave(handleLeave: (event: TouchEventInit, canvas: Canvas) => void) {
    this.element.addEventListener("touchleave", (event) => {
      event.preventDefault();
      handleLeave(event, this);
    });
  }

  public touchmove(handleMove: (event: TouchEvent, canvas: Canvas) => void) {
    this.element.addEventListener("touchmove", (event) => {
      event.preventDefault();
      handleMove(event, this);
    });
  }
}

export const getCanvas = (drawing: drawing, collisions: collisions, id?: string) => {
  const canvas = new Canvas(id);
  animate(canvas, drawing, collisions);
  return canvas;
};

function draw(canvas: Canvas, drawing: drawing, collisions?: collisions, timestamp?: number) {
  canvas.ctx?.clearRect(0, 0, canvas.element.width, canvas.element.height);
  drawing(canvas, timestamp);

  if (collisions)
    collisions(canvas);

  window.requestAnimationFrame((time: number) => draw(canvas, drawing, collisions, timestamp));
}

function animate(canvas: Canvas, drawing: drawing, collisions: collisions) {
  window.requestAnimationFrame((time: number) => draw(canvas, drawing, collisions, time));
}