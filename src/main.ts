/**/
import './style.css'
import { getCanvas, Canvas } from './components/canvas.js'
import AniObj, { Size, Point } from './components/object.js';
import Sprite from './components/sprite.js';

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

function drawBoard(canvas: Canvas, ctx: CanvasRenderingContext2D) {
  const centerX = canvas.center.y - 100;
  const centerY = canvas.center.x - 100;
  const border = 5;

  ctx.fillStyle = '#000000';
  ctx.fillRect(centerY - border, centerX - border,
    squareSize * 4 + (border * 2),
    squareSize * 4 + (border * 2));

  // Dibuja el tablero
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      // Calcula la posición del cuadrado
      let x = centerY + j * squareSize;
      let y = centerX + i * squareSize;

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
  canvas.text('Pawn = Queen', { x: centerY + 54, y: centerX + 164 }, '#643437', '14px Arial');
  canvas.text('promote the pawn', { x: centerY + 58, y: centerX + 174 }, '#643437', '10px Arial');
  canvas.text('then move the queen', { x: centerY + 52, y: centerX + 184 }, '#643437', '10px Arial');
  canvas.text('to the red square', { x: centerY + 60, y: centerX + 194 }, '#643437', '10px Arial');
}
function drawPiece(canvas: Canvas) {
  const element = canvas.element;
  const centerX = canvas.center.y - 94;
  const centerY = canvas.center.x - 94;

  const caballo1 = AniObj(element, size, { x: centerY + 0, y: centerX + 0 });
  const caballo2 = AniObj(element, size, { x: centerY + 50, y: centerX + 0 });
  const caballo3 = AniObj(element, size, { x: centerY + 100, y: centerX + 0 });
  const caballo4 = AniObj(element, size, { x: centerY + 150, y: centerX + 0 });

  const alfil1 = AniObj(element, size, { x: centerY + 0, y: centerX + 50 });
  const alfil2 = AniObj(element, size, { x: centerY + 50, y: centerX + 50 });
  const alfil3 = AniObj(element, size, { x: centerY + 100, y: centerX + 50 });
  const alfil4 = AniObj(element, size, { x: centerY + 150, y: centerX + 50 });

  const torre1 = AniObj(element, size, { x: centerY + 0, y: centerX + 100 });
  const torre2 = AniObj(element, size, { x: centerY + 50, y: centerX + 100 });
  const torre3 = AniObj(element, size, { x: centerY + 100, y: centerX + 100 });
  const torre4 = AniObj(element, size, { x: centerY + 150, y: centerX + 100 });

  const peon = AniObj(element, size, { x: centerY + 150, y: centerX + 150 });
  const rey = AniObj(element, size, { x: centerY + 143, y: centerX + 0 });

  //propiedades de piezas
  rey.visibility = false;

  caballo1.sprite(spriteN);
  caballo2.sprite(spriteN);
  caballo3.sprite(spriteN);
  caballo4.sprite(spriteN);

  alfil1.sprite(spriteB);
  alfil2.sprite(spriteB);
  alfil3.sprite(spriteB);
  alfil4.sprite(spriteB);

  torre1.sprite(spriteR);
  torre2.sprite(spriteR);
  torre3.sprite(spriteR);
  torre4.sprite(spriteR);

  peon.sprite(spriteP);
  rey.sprite(spriteK);


  const center_X = canvas.center.y - 100;
  const center_Y = canvas.center.x - 100;

  canvas.text("x : " + center_X, { x: 15, y: 50 });
  canvas.text("y : " + center_Y, { x: 15, y: 65 });


  canvas.touchstart((event: TouchEvent, cv: Canvas) => {
    const touch = event.touches[0];
    caballo1.setDx = centerY + 0;
    caballo1.setDy = centerX + 50;

    if (
      touch.clientX > center_X &&
      touch.clientY > center_Y &&
      touch.clientX < (center_X + 200) &&
      touch.clientY < (center_Y + 200)) {
    }

    //touch.screenX
    const x = touch.clientX - canvas.element.offsetLeft;
    const y = touch.clientY - canvas.element.offsetTop;

    const ctx = canvas.element.getContext('2d');

    ctx?.fillRect(15, 110, 50, 50);

    cv.text("cli x : " + touch.clientX, { x: 15, y: 80 });
    cv.text("cli y : " + touch.clientY, { x: 15, y: 95 });
  });

}

//plano 2
function drawing2(canvas: Canvas, _: number) {
  const element: HTMLCanvasElement = canvas.element;
  const ctx: CanvasRenderingContext2D | null = element.getContext('2d');
  element2.width = window.innerWidth;
  element2.height = window.innerHeight;

  //crear board
  drawBoard(canvas, ctx as CanvasRenderingContext2D);
  //crear piezas
  drawPiece(canvas);
}
function collisions2(canvas: Canvas) {

}
const element2 = getCanvas(drawing2, collisions2);

const div = document.querySelector<HTMLDivElement>('#app');
div!.appendChild(element1);
div!.appendChild(element2);
