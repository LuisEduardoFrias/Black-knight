/**/
import './style.css'
import { getCanvas, Canvas } from './components/canvas.ts'
import AniObj, { Size, Point } from './components/object.ts';
import Sprite from './components/sprite.ts';

const spriteK = new Sprite('/FreePack/KingWhite.png');
const spriteP = new Sprite('/FreePack/PawnWhite.png');
const spriteR = new Sprite('/FreePack/RookWhite.png');
const spriteN = new Sprite('/FreePack/NightWhite.png');
const spriteB = new Sprite('/FreePack/BishopWhite.png');

const squareSize = 50;
const boardSize = 4;
const size: Size = { width: squareSize, height: squareSize };

//plano 1
function drawing(canvas: Canvas, timestamp: number) {
  canvas.text((timestamp).toString(), { x: 15, y: 20 }, 'black')
  canvas.backgroud('/roble-texture.jpg');
}
function collisions(canvas: Canvas) {

}
const element1 = getCanvas(drawing, collisions);

function drowBoard(canvas: Canvas, ctx: CanvasRenderingContext2D) {
  const ii = canvas.center.y - 100;
  const jj = canvas.center.x - 100;
  const border = 5;

  ctx.fillStyle = '#000000';
  ctx.fillRect(jj - border, ii - border,
    squareSize * 4 + (border * 2),
    squareSize * 4 + (border * 2));

  // Dibuja el tablero
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      // Calcula la posición del cuadrado
      let x = jj + j * squareSize;
      let y = ii + i * squareSize;

      // Define el color del cuadrado
      let color = (i + j) % 2 === 0 ? '#5b2c1b' : '#c7a181';
      // Comprueba si es el cuadrado combinado
      if (i === 3 && j === 0) {
        color = '#a83046';
      }

      ctx.fillStyle = color;

      if ((i === 3 && j === 1) || (i === 3 && j === 2)) {

        if (i === 3 && j === 1) {
          ctx.fillStyle = '#f78b3a';
          ctx.fillRect(x, y, squareSize, squareSize);
          ctx.fillStyle = '#f5d1b6';
          ctx.fillRect(x + 2, y + 2, squareSize - 1, squareSize - 1);
        }
        if (i === 3 && j === 2) {
          ctx.fillStyle = '#f78b3a';
          ctx.fillRect(x, y, squareSize, squareSize);
          ctx.fillStyle = '#f5d1b6';
          ctx.fillRect(x, y + 2, squareSize - 2, squareSize - 1);
        }
      }
      else {
        ctx.fillRect(x, y, squareSize, squareSize);
      }
    }
  }

  // Dibuja el texto en el cuadrado combinado
  canvas.text('Pawn = Queen', { x: jj + 54, y: ii + 164 }, '#643437', '14px Arial');
  canvas.text('promote the pawn', { x: jj + 58, y: ii + 174 }, '#643437', '10px Arial');
  canvas.text('then move the queen', { x: jj + 52, y: ii + 184 }, '#643437', '10px Arial');
  canvas.text('to the red square', { x: jj + 60, y: ii + 194 }, '#643437', '10px Arial');
}
//plano 2
function drawing2(canvas: Canvas, _: number) {
  const element: HTMLCanvasElement = canvas.element;
  const ctx: CanvasRenderingContext2D | null = element.getContext('2d');
  element2.width = window.innerWidth;
  element2.height = window.innerHeight;

  drowBoard(canvas, ctx as CanvasRenderingContext2D);

  //crear piezas
  const ii = canvas.center.y - 94;
  const jj = canvas.center.x - 94;

  const caballo1 = AniObj(element, size, { x: jj + 0, y: ii + 0 });
  const caballo2 = AniObj(element, size, { x: jj + 50, y: ii + 0 });
  const caballo3 = AniObj(element, size, { x: jj + 100, y: ii + 0 });
  const caballo4 = AniObj(element, size, { x: jj + 150, y: ii + 0 });

  const alfil1 = AniObj(element, size, { x: jj + 0, y: ii + 50 });
  const alfil2 = AniObj(element, size, { x: jj + 50, y: ii + 50 });
  const alfil3 = AniObj(element, size, { x: jj + 100, y: ii + 50 });
  const alfil4 = AniObj(element, size, { x: jj + 150, y: ii + 50 });

  const torre1 = AniObj(element, size, { x: jj + 0, y: ii + 100 });
  const torre2 = AniObj(element, size, { x: jj + 50, y: ii + 100 });
  const torre3 = AniObj(element, size, { x: jj + 100, y: ii + 100 });
  const torre4 = AniObj(element, size, { x: jj + 150, y: ii + 100 });

  const peon = AniObj(element, size, { x: jj + 150, y: ii + 150 });
  const rey = AniObj(element, size, { x: jj + 143, y: ii + 0 });

  //propiedades de piezas
  rey.visibility = false;

  caballo1.sprite(spriteN, { x: 0, y: 0 });
  caballo2.sprite(spriteN, { x: 0, y: 0 });
  caballo3.sprite(spriteN, { x: 0, y: 0 });
  caballo4.sprite(spriteN, { x: 0, y: 0 });

  alfil1.sprite(spriteB, { x: 0, y: 0 });
  alfil2.sprite(spriteB, { x: 0, y: 0 });
  alfil3.sprite(spriteB, { x: 0, y: 0 });
  alfil4.sprite(spriteB, { x: 0, y: 0 });

  torre1.sprite(spriteR, { x: 0, y: 0 });
  torre2.sprite(spriteR, { x: 0, y: 0 });
  torre3.sprite(spriteR, { x: 0, y: 0 });
  torre4.sprite(spriteR, { x: 0, y: 0 });

  peon.sprite(spriteP, { x: 0, y: 0 });
  rey.sprite(spriteK, { x: 0, y: 0 });

  canvas.touchstart((event: TouchEvent, canvas: Canvas) => {

  });

}
function collisions2(canvas: Canvas, element: HTMLCanvasElement) {

}
const element2 = getCanvas(drawing2, collisions2);

const div = document.querySelector<HTMLDivElement>('#app');
div!.appendChild(element1);
div!.appendChild(element2);

/////////////////////////////////////////////////
/////////////////////////////////////////////////

interface Touch {
  identifier: number;
  target: EventTarget;
  screenX: number;
  screenY: number;
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
};

interface TouchList {
  length: number;
  item(index: number): Touch;
  identifiedTouch(identifier: number): Touch;
};

interface TouchEvent extends UIEvent {
  touches: TouchList;
  targetTouches: TouchList;
  changedTouches: TouchList;
  altKey: boolean;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  initTouchEvent(type: string, canBubble: boolean,
    cancelable: boolean, view: AbstractView, detail: number,
    ctrlKey: boolean, altKey: boolean, shiftKey: boolean,
    metaKey: boolean, touches: TouchList, targetTouches: TouchList,
    schangedTouches: TouchList);
};

declare var TouchEvent: {
  prototype: TouchEvent;
  new(): TouchEvent;
}
