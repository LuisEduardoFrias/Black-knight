/*
 * */

import Sprite from "./sprite.js";

export type Size = {
  width: number,
  height: number
}
export type Point = {
  x: number,
  y: number
}

class AnimateObject {
  private width: number;
  private height: number;
  private oldDx: number;
  private oldDy: number;
  private dx: number;
  private dy: number;
  private px: number;
  private py: number;
  public visibility: boolean;
  private canvas: HTMLCanvasElement;

  private u: number = 0;    //Es la velocidad inicial(en este caso, 0 m / s)
  private a: number = 9.8; //Es la aceleración debida a la gravedad(9.8 m / s²)
  private s: number;     //Es la distancia de caída(3 metros)

  /*
    v² = u² + 2as

    v² = 0² + 2 * 9.8 * 3 v² = 58.8 v = √58.8 ≈ 7.67
  */

  constructor(
    canvas: HTMLCanvasElement,
    size?: Size,
    point?: Point,
  ) {
    this.width = size?.width ?? 35;
    this.height = size?.height ?? 35;
    this.oldDx = -(size?.width ?? 35);
    this.oldDy = -(size?.height ?? 35);

    this.dx = point?.x ?? 0;
    this.dy = point?.y ?? 0;
    this.px = 0;
    this.s = 46.36;
    this.py = Math.pow(this.u, 2) + (2 * this.a * this.s);
    this.visibility = true;
    this.canvas = canvas;

    this.drawRect();
  }

  private drawRect() {
    const ctx = this.canvas.getContext('2d');
    ctx.fillStyle = '#4cf4e1';

    /*
    ctx?.fillRect(this.dx, this.dy, this.width, this.height);
    ctx?.clearRect(this.oldDx, this.oldDy, this.width, this.height);
    ctx?.fillRect(this.dx + 5, this.dy + 5, this.width - 10, this.height - 10);

    ctx?.beginPath();
    //ctx?.fillStyle = "#0099ff";
    ctx?.stroke();
    */
  }

  get getWidth(): number {
    return this.width;
  }

  set setWidth(width: number) {
    this.width = width;
    this.drawRect(); // Agregamos la línea this.drawRect()
  }

  get getHeight(): number {
    return this.height;
  }

  set setHeight(height: number) {
    this.height = height;
    this.drawRect(); // Agregamos la línea this.drawRect()
  }

  get getDx(): number {
    return this.dx;
  }

  set setDx(dx: number) {
    this.oldDx = this.dx;
    this.dx = dx;
    this.drawRect(); // Agregamos la línea this.drawRect()
  }

  get getDy(): number {
    return this.dy;
  }

  set setDy(dy: number) {
    this.oldDy = this.dy;
    this.dy = dy;
    this.drawRect(); // Agregamos la línea this.drawRect()
  }

  get getPx(): number {
    return this.px;
  }

  set setPx(px: number) {
    this.px = px;
    this.drawRect(); // Agregamos la línea this.drawRect()
  }

  get getPy(): number {
    return this.py;
  }

  set setPy(py: number) {
    this.py = py;
    this.drawRect(); // Agregamos la línea this.drawRect()
  }

  get getS(): number {
    return this.s;
  }

  set setS(s: number) {
    this.s = s;
    this.drawRect();
  }

  sprite(sprite: Sprite, clip?: Point, cutSize?: Size, position?: Point) {
    if (this.visibility) {
      const ctx = this.canvas.getContext('2d');
      //ctx?.fillRect(this.dx, this.dy, 50, 50)
      ctx?.drawImage(
        sprite.img,//image
        clip?.x ?? 0,
        clip?.y ?? 0, //cordenadas de recorte
        cutSize?.width ?? this.width,
        cutSize?.height ?? this.height,//tamaño del recorte
        position?.x ?? this.dx,
        position?.y ?? this.dy,//posicion del dibujo
        this.width,
        this.height);//medidas del dibujo
    }
  }

  keyDownHandler(callback: (keyboard: string) => void) {
    this.canvas.addEventListener('keydown', (event) => {
      const { key } = event;
      callback(key);
    });
  }

  keyaUpHandler(callback: (keyboard: string) => void) {
    this.canvas.addEventListener('keyup', (event) => {
      const { key } = event;
      callback(key);
    });
  }

  keyPressHandler(callback: (keyboad: string) => void) {
    this.canvas.addEventListener('keypress', (event) => {
      const { key } = event;
      callback(key);
    });
  }
}

export default function AniObj(
  canvas: HTMLCanvasElement,
  size?: Size,
  point?: Point
) {
  const ao = new AnimateObject(canvas, size, point);
  return ao;
}

//ctx.fillStyle = "#fff" color de reyeno
//ctx.fill() reyenar 
